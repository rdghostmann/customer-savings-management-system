"use client"

import { useState } from "react"
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent } from "@/components/ui/card"

// Sample template data
const templateData = [
  {
    id: "1",
    name: "Balance Notification",
    content: "Dear customer, your current balance is {{balance}}. Thank you for saving with us!",
    lastUsed: "2 days ago",
  },
  {
    id: "2",
    name: "Payment Reminder",
    content:
      "Dear customer, this is a friendly reminder that your payment of {{amount}} is due on {{date}}. Thank you.",
    lastUsed: "1 week ago",
  },
  {
    id: "3",
    name: "New Service Announcement",
    content:
      "Dear customer, we're excited to announce our new savings plan with higher interest rates! Visit our office to learn more.",
    lastUsed: "2 weeks ago",
  },
  {
    id: "4",
    name: "Holiday Greetings",
    content:
      "Dear customer, we wish you a happy holiday season and prosperous new year! Thank you for your continued trust.",
    lastUsed: "3 months ago",
  },
]

export default function MessageTemplates() {
  const [templates, setTemplates] = useState(templateData)

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this template?")) {
      setTemplates(templates.filter((template) => template.id !== id))
    }
  }

  const handleCopy = (content) => {
    navigator.clipboard.writeText(content)
    alert("Template copied to clipboard!")
  }

  const handleEdit = (id) => {
    alert(`Edit template ${id}`)
    // In a real app, this would open an edit modal or navigate to an edit page
  }

  return (
    <div className="space-y-4">
      {templates.map((template) => (
        <Card key={template.id}>
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
                  <DropdownMenuItem onClick={() => handleCopy(template.content)}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleEdit(template.id)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDelete(template.id)} className="text-red-600">
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
    </div>
  )
}
