import MainLayout from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function CreatePage() {
    return (
        <MainLayout>
            <div className="space-y-4">
                <h1 className="text-2xl font-bold">Create Post</h1>
                <form className="space-y-4">
                    <Input placeholder="Title" />
                    <Textarea placeholder="What's on your mind?" />
                    <Button type="submit">Post</Button>
                </form>
            </div>
        </MainLayout>
    )
}

