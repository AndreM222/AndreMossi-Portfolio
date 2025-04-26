import {
    AlertIcon,
    Box,
    AlertTitle,
    AlertDescription,
    Alert,
    CloseButton,
    useDisclosure,
    chakra,
    shouldForwardProp
} from '@chakra-ui/react'
import { motion } from 'framer-motion'

const StyledDiv = chakra(motion.div, {
    shouldForwardProp: prop => {
        return shouldForwardProp(prop) || prop === 'transition'
    }
})

const AlertNotification = ({
    title,
    statement = true,
    type,
    children,
    ...props
}) => {
    const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true })

    if (isOpen && statement)
        return (
            <StyledDiv
                position="fixed"
                right={{ base: '0', lg: '50%' }}
                top="1/2"
                zIndex="50"
                w={{ base: 'full', sm: 'fit-content' }}
                initial={{ x: -100, opacity: 0, backdropFilter: 'blur(0px)' }}
                animate={{ x: 0, opacity: 1, backdropFilter: 'blur(10px)' }}
                m={3}
                transition={{ duration: 0.6, delay: 0.6 }}
            >
                <Alert
                    backdropFilter="auto"
                    rounded="lg"
                    status={type}
                    variant="left-accent"
                    {...props}
                >
                    <AlertIcon />
                    <Box>
                        <AlertTitle>{title}</AlertTitle>
                        <AlertDescription>{children}</AlertDescription>
                    </Box>
                    <CloseButton
                        alignSelf="flex-start"
                        position="relative"
                        right={-1}
                        top={-1}
                        onClick={onClose}
                    />
                </Alert>
            </StyledDiv>
        )

    return <div />
}

export default AlertNotification
