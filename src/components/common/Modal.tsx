import * as Dialog from '@radix-ui/react-dialog'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import CloseButton from './buttons/CloseButton'

interface ModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    title?: string
    children: ReactNode
}

const Modal = ({ open, onOpenChange, title, children }: ModalProps) => {
    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-md z-40" />

                <Dialog.Content asChild>
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                       bg-[#1a1a1a] text-white rounded-xl p-6 shadow-lg 
                       w-[90vw] max-w-md"
                    >
                        {title && (
                            <Dialog.Title className="text-lg font-semibold mb-4 text-center">{title}</Dialog.Title>
                        )}

                        <div className="w-full flex justify-center">
                            {children}
                        </div>

                        <Dialog.Close asChild>
                            <CloseButton top={'[20px]'} />
                        </Dialog.Close>
                    </motion.div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

export default Modal
