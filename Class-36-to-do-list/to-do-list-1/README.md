# 📝 To-Do List App

A modern, feature-rich to-do list application built with vanilla JavaScript and Tailwind CSS.

## ✨ Features

- ✅ **Add Tasks** - Easily add new tasks using the input field
- 🎯 **Mark Complete** - Click on a task to mark it as complete/incomplete
- 🗑️ **Delete Tasks** - Remove tasks with the delete button (appears on hover)
- 🔍 **Filter Tasks** - View all, active, or completed tasks
- 📊 **Statistics** - Real-time stats showing total, completed, and remaining tasks
- 💾 **Local Storage** - All tasks are automatically saved to browser storage
- 🎨 **Responsive Design** - Works perfectly on desktop and mobile devices
- ⌨️ **Keyboard Support** - Press Enter to quickly add a task

## 🚀 Quick Start

1. Open `index.html` in your web browser
2. Start adding tasks to your to-do list
3. Use the filters to organize your view
4. Your tasks will be automatically saved

## 📁 Project Structure

```
├── index.html       # HTML structure and layout
├── script.js        # Vanilla JavaScript logic
├── style.css        # Additional CSS styles
└── README.md        # This file
```

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **Vanilla JavaScript** - Pure JS (no frameworks)
- **Tailwind CSS** - Utility-first CSS framework via CDN
- **LocalStorage API** - Browser storage for persistence

## 💡 How It Works

### Adding Tasks
- Type in the input field and click "Add" or press Enter
- New tasks appear at the bottom of the list

### Managing Tasks
- **Mark Complete**: Click the checkbox next to a task
- **Delete**: Hover over a task to reveal the delete button

### Filtering
- **All**: View all tasks
- **Active**: View only uncompleted tasks
- **Completed**: View only completed tasks
- **Clear Completed**: Remove all completed tasks at once

### Statistics
The card at the top shows:
- Total number of tasks
- Number of completed tasks
- Number of remaining tasks

## 🌐 Browser Compatibility

Works in all modern browsers that support:
- ES6 JavaScript
- LocalStorage API
- CSS Grid and Flexbox

## 📝 Local Storage

Tasks are automatically saved to `localStorage` under the key `todos`. This means:
- Your tasks persist even after closing the browser
- No backend server needed
- Data is stored locally on your device

## 🎯 Future Enhancements

Consider adding:
- Edit task functionality
- Due dates and priorities
- Categories/tags
- Dark mode toggle
- Export/Import tasks
- Recurring tasks

---

**Built with ❤️ using Vanilla JS and Tailwind CSS**
