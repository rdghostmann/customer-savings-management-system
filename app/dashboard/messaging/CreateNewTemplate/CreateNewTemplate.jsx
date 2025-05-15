"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { CreateTemplateMsg } from "@/controllers/CreateTemplateMsg"
import { useRouter } from "next/navigation"

const CreateNewTemplate = ({ onCreated }) => {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await CreateTemplateMsg({ name, content })
      toast.success("Template created successfully")
      router.refresh();

      setOpen(false)
      setName("")
      setContent("")
      if (onCreated) onCreated()
    } catch {
      toast.error("Failed to create template")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => setOpen(true)}>
        <span className="mr-2">+</span> Create New Template
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Message Template</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Template Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Textarea
              placeholder="Template Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="min-h-[80px]"
            />
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CreateNewTemplate