"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Circle } from "lucide-react"

interface TodoItem {
  id: number
  task: string
  completed: boolean
}

export function TodoManager() {
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: 1, task: "Setup Project Structure & Data", completed: true },
    { id: 2, task: "Build Navigation & Hero Section", completed: true },
    { id: 3, task: "Create Menu System with Filtering", completed: true },
    { id: 4, task: "Add About & Contact Sections", completed: true },
    { id: 5, task: "Implement Dark Mode & Accessibility", completed: true },
  ])

  const toggleTodo = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const completedCount = todos.filter((todo) => todo.completed).length

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Kantin Mini Progress</span>
          <span className="text-sm font-normal text-muted-foreground">
            {completedCount}/{todos.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {todos.map((todo) => (
          <div key={todo.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
            <Button
              variant="ghost"
              size="sm"
              className="p-0 h-auto"
              onClick={() => toggleTodo(todo.id)}
              aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
            >
              {todo.completed ? (
                <CheckCircle2 className="h-5 w-5 text-primary" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground" />
              )}
            </Button>
            <span
              className={`flex-1 text-sm ${todo.completed ? "line-through text-muted-foreground" : "text-foreground"}`}
            >
              {todo.task}
            </span>
          </div>
        ))}

        {completedCount === todos.length && (
          <div className="text-center py-4">
            <p className="text-sm text-primary font-medium">🎉 Kantin Mini website completed!</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
