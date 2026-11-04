from pathlib import Path
import os
import subprocess

import requests


COMMIT_INFO = {
    "MS-AndreCV-EN": ("resume-en", "Resume English"),
    "MS-AndreCV-ES": ("resume-es", "Resume Spanish"),
    "Rireki-Andre-JP": ("resume-ja", "Resume Japanese"),
    "SKS-Andre-JP": ("resume-ja", "Resume Japanese"),
}

FILES = [
    (
        "Papers/MS_Style/EN/MS-AndreCV-EN.pdf",
        "public/PDF/MS-AndreCV-EN.pdf",
    ),
    (
        "Papers/MS_Style/ES/MS-AndreCV-ES.pdf",
        "public/PDF/MS-AndreCV-ES.pdf",
    ),
    (
        "Papers/JA_Style/rirekisho/JP/Rireki-Andre-JP.pdf",
        "public/PDF/Rireki-Andre-JP.pdf",
    ),
    (
        "Papers/JA_Style/shokumu_keireki_sho/JP/SKS-Andre-JP.pdf",
        "public/PDF/SKS-Andre-JP.pdf",
    ),
]


def download_pdf(
    repo_owner: str,
    repo_name: str,
    file_path: str,
    revision: str,
    output_file: str,
    token: str | None = None,
) -> None:
    url = (
        f"https://raw.githubusercontent.com/"
        f"{repo_owner}/{repo_name}/{revision}/{file_path}"
    )

    headers = {}
    if token:
        headers["Authorization"] = f"Bearer {token}"

    output_path = Path(output_file)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    print(f"Downloading PDF from: {url}")

    with requests.get(url, headers=headers, stream=True, timeout=30) as response:
        response.raise_for_status()

        with output_path.open("wb") as pdf_file:
            for chunk in response.iter_content(chunk_size=8192):
                if chunk:
                    pdf_file.write(chunk)

    print(f"Saved PDF to: {output_path.resolve()}")


def set_action_output(name: str, value: str) -> None:
    output_file = os.environ.get("GITHUB_OUTPUT")
    if output_file:
        with open(output_file, "a", encoding="utf-8") as file:
            file.write(f"{name}={value}\n")


def main() -> None:
    owner = "AndreM222"
    repo = "Resume"
    source_sha = os.environ["SOURCE_SHA"]
    cv_repo_token = os.environ.get("CV_REPO_TOKEN")

    for source_path, output_path in FILES:
        download_pdf(
            repo_owner=owner,
            repo_name=repo,
            file_path=source_path,
            revision=source_sha,
            output_file=output_path,
            token=cv_repo_token,
        )

    run_id = os.environ["GITHUB_RUN_ID"]
    run_attempt = os.environ["GITHUB_RUN_ATTEMPT"]
    branch_name = (
        f"automation/cv-update-{source_sha[:12]}-{run_id}-{run_attempt}"
    )

    subprocess.run(
        ["git", "config", "user.name", "github-actions[bot]"],
        check=True,
    )
    subprocess.run(
        [
            "git",
            "config",
            "user.email",
            "41898282+github-actions[bot]@users.noreply.github.com",
        ],
        check=True,
    )
    subprocess.run(["git", "checkout", "-b", branch_name], check=True)

    made_commits = False

    for _, output_path in FILES:
        stem = Path(output_path).stem
        commit_type, title = COMMIT_INFO[stem]

        subprocess.run(["git", "add", "--", output_path], check=True)

        # Skip this PDF if its contents have not changed.
        result = subprocess.run(["git", "diff", "--cached", "--quiet"])
        if result.returncode == 0:
            continue
        if result.returncode != 1:
            raise RuntimeError("Could not check staged changes")

        subject = f"{commit_type}({stem}): {title}"
        subprocess.run(
            [
                "git",
                "commit",
                "-m",
                subject,
                "-m",
                f"Just updated my experience information found in my CV. Check it out!",
            ],
            check=True,
        )
        made_commits = True

    if not made_commits:
        print("No PDFs changed; no branch or pull request is needed.")
        set_action_output("has_commits", "false")
        return

    subprocess.run(
        ["git", "push", "--set-upstream", "origin", branch_name],
        check=True,
    )

    set_action_output("has_commits", "true")
    set_action_output("branch", branch_name)


if __name__ == "__main__":
    main()
