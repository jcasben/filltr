import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface MultiReplyProps {
    onSend: (message: string) => void
    onCancel: () => void
}

export function MultiReply({ onSend, onCancel }: MultiReplyProps) {
    const [message, setMessage] = useState('')

    const handleSend = () => {
        if (message.trim()) {
            onSend(message)
            setMessage('')
        }
    }

    return (
        <div className="fixed bottom-16 left-0 right-0 bg-background border-t p-4">
            <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your reply..."
                className="mb-2"
            />
            <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={onCancel}>Cancel</Button>
                <Button onClick={handleSend}>Send</Button>
            </div>
        </div>
    )
}