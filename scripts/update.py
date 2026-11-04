from pathlib import Path
import requests
import os
import subprocess


COMMIT_INFO = {
    "MS-AndreCV-EN": ("resume-en", "Resume English"),
    "MS-AndreCV-ES": ("resume-es", "Resume Spanish"),
    "Rireki-Andre-JP": ("resume-ja", "Resume Japanese"),
    "SKS-Andre-JP": ("resume-ja", "Resume Japanese"),
}


def download_pdf(
    repo_owner: str,
    repo_name: str,
    file_path: str,
    branch: str,
    output_file: str,
    token: str | None = None,
) -> None:
    url = (
        f"https://raw.githubusercontent.com/"
        f"{repo_owner}/{repo_name}/{branch}/{file_path}"
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


if __name__ == "__main__":
    # These should point to the repository that contains the source PDFs.
    OWNER = "AndreM222"
    REPO = "Resume"
    SOURCE_SHA = os.environ["SOURCE_SHA"]

    files = [
        (
            "Papers/MS_Style/EN/MS-AndreCV-EN.pdf",
            "public/PDF/MS-AndreCV-EN.pdf",
        ),
        (
            "Papers/MS_Style/ES/MS-AndreCV-ES.pdf",
            "public/PDF/MS-AndreCV-ES.pdf",
        ),
        (
            "Papers/MS_Style/Rireki-Andre-JP.pdf",
            "Papers/JA_Style/rirekisho/JP/Rireki-Andre-JP.pdf"
        ),
        (
            "Papers/MS_Style/SKS-Andre-JP.pdf",
            "Papers/JA_Style/shokumu_keireki_sho/JP/SKS-Andre-JP.pdf"
        ),
    ]

    # Set this from an environment variable for a private repo.
    GITHUB_TOKEN = None

    for source_path, output_path in files:
        download_pdf(
            repo_owner=OWNER,
            repo_name=REPO,
            file_path=source_path,
            output_file=output_path,
            branch=SOURCE_SHA,
            token=GITHUB_TOKEN,
        )

    subprocess.run(
        ["git", "config", "user.name", "github-actions[bot]"],
        check=True,
    )
    subprocess.run(
        ["git", "config", "user.email",
            "41898282+github-actions[bot]@users.noreply.github.com"],
        check=True,
    )

    made_commits = False

    for _, output_path in files:
        stem = Path(output_path).stem
        commit_type, title = COMMIT_INFO[stem]

        subprocess.run(["git", "add", "--", output_path], check=True)

        # Skip this PDF if its contents haven't changed.
        result = subprocess.run(["git", "diff", "--cached", "--quiet"])
        if result.returncode == 0:
            continue
        if result.returncode != 1:
            raise RuntimeError("Could not check staged changes")

        subject = f"{commit_type}({stem}): {title}"
        subprocess.run(
            ["git", "commit", "-m", subject, "-m",
                f"Source CV commit: {SOURCE_SHA}"],
            check=True,
        )
        made_commits = True

    if made_commits:
        subprocess.run(["git", "push", "origin", "main"], check=True)
