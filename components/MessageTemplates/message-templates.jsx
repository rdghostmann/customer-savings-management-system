"use client"

import { useState } from "react"
import { Copy, Edit, MoreHorizontal, Trash, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { updateMsg } from "@/controllers/updateMsg"
import { removeTemplateMsg } from "@/controllers/removeTemplateMsg"

export default function MessageTemplates({ customers, templateData }) {
  const [templates, setTemplates] = useState(templateData)
  const [editOpen, setEditOpen] = useState(false)
  const [editTemplate, setEditTemplate] = useState(null)
  const [editName, setEditName] = useState("")
  const [editContent, setEditContent] = useState("")
  const [loading, setLoading] = useState(false)

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this template?")) {
      try {
        await removeTemplateMsg(id)
        setTemplates(templates.filter((template) => (template._id || template.id) !== id))
        toast.success("Template deleted successfully")
      } catch {
        toast.error("Failed to delete template")
      }
    }
  }

  const handleEdit = (id) => {
    const template = templates.find((t) => (t._id || t.id) === id)
    setEditTemplate(template)
    setEditName(template.name)
    setEditContent(template.content)
    setEditOpen(true)
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const updated = await updateMsg(editTemplate._id || editTemplate.id, {
        name: editName,
        content: editContent,
      })
      setTemplates((prev) =>
        prev.map((t) =>
          (t._id || t.id) === (editTemplate._id || editTemplate.id)
            ? { ...t, name: editName, content: editContent }
            : t
        )
      )
      toast.success("Template updated successfully")
      setEditOpen(false)
    } catch {
      toast.error("Failed to update template")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {templates.map((template) => (
        <Card key={template._id || template.id}>
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">{template.name}</h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleEdit(template._id || template.id)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDelete(template._id || template.id)} className="text-red-600">
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{template.content}</p>
            <div className="text-xs text-muted-foreground">Last used: {template.lastUsed}</div>
          </CardContent>
        </Card>
      ))}

      {/* Edit Overlay Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Message Template</DialogTitle>
            <Button
              variant="ghost"
              className="absolute top-2 right-2"
              onClick={() => setEditOpen(false)}
              size="icon"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <Input
              label="Template Name"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              required
              placeholder="Template Name"
            />
            <Textarea
              label="Template Content"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              required
              placeholder="Template Content"
              className="min-h-[80px]"
            />
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setEditOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}