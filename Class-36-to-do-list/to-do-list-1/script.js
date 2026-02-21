// Get DOM elements
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const filterBtns = document.querySelectorAll('.filter-btn');
const clearCompletedBtn = document.getElementById('clearCompleted');

// Stats elements
const totalTasksEl = document.getElementById('totalTasks');
const completedTasksEl = document.getElementById('completedTasks');
const remainingTasksEl = document.getElementById('remainingTasks');

// State
let todos = [];
let currentFilter = 'all';
let editingId = null;

// Initialize app
function init() {
    loadTodos();
    renderTodos();
    setupEventListeners();
}

// Setup event listeners
function setupEventListeners() {
    addBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTodo();
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.id.replace('filter', '').toLowerCase();
            renderTodos();
        });
    });

    clearCompletedBtn.addEventListener('click', clearCompleted);
}

// Add a new todo
function addTodo() {
    const text = todoInput.value.trim();
    
    if (text === '') {
        alert('Please enter a task!');
        return;
    }

    const newTodo = {
        id: Date.now(),
        text: text,
        completed: false,
        createdAt: new Date()
    };

    todos.push(newTodo);
    todoInput.value = '';
    todoInput.focus();
    saveTodos();
    renderTodos();
}

// Toggle todo completion status
function toggleTodo(id) {
    todos = todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveTodos();
    renderTodos();
}

// Delete a todo
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
}

// Edit a todo
function startEdit(id) {
    editingId = id;
    renderTodos();
}

// Save edited todo
function saveEdit(id) {
    const editInput = document.querySelector(`input[data-edit-id="${id}"]`);
    if (!editInput) return;
    
    const newText = editInput.value.trim();
    
    if (newText === '') {
        alert('Task cannot be empty!');
        editInput.focus();
        return;
    }
    
    todos = todos.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
    );
    
    editingId = null;
    saveTodos();
    renderTodos();
}

// Cancel edit
function cancelEdit() {
    editingId = null;
    renderTodos();
}

// Clear all completed todos
function clearCompleted() {
    if (todos.some(todo => todo.completed)) {
        if (confirm('Delete all completed tasks?')) {
            todos = todos.filter(todo => !todo.completed);
            saveTodos();
            renderTodos();
        }
    } else {
        alert('No completed tasks to clear!');
    }
}

// Render todos
function renderTodos() {
    // Filter todos based on current filter
    let filteredTodos = todos;
    if (currentFilter === 'active') {
        filteredTodos = todos.filter(todo => !todo.completed);
    } else if (currentFilter === 'completed') {
        filteredTodos = todos.filter(todo => todo.completed);
    }

    // Clear list
    todoList.innerHTML = '';

    // Show empty state
    if (todos.length === 0) {
        todoList.innerHTML = `
            <div class="text-center text-gray-500 py-8">
                <p class="text-lg">No tasks yet. Add one to get started! 🚀</p>
            </div>
        `;
        updateStats();
        return;
    }

    // Show filtered empty state
    if (filteredTodos.length === 0) {
        const emptyMsg = currentFilter === 'active' 
            ? 'No active tasks! 🎉' 
            : 'No completed tasks yet!';
        todoList.innerHTML = `
            <div class="text-center text-gray-500 py-8">
                <p class="text-lg">${emptyMsg}</p>
            </div>
        `;
        updateStats();
        return;
    }

    // Render todos
    filteredTodos.forEach(todo => {
        const todoItem = document.createElement('div');
        
        // Edit mode
        if (editingId === todo.id) {
            todoItem.className = `flex items-center gap-3 p-4 bg-indigo-50 rounded-lg border-2 border-indigo-500 transition duration-200`;
            
            todoItem.innerHTML = `
                <input 
                    type="checkbox" 
                    disabled
                    class="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500 cursor-not-allowed opacity-50"
                >
                <input 
                    type="text" 
                    value="${escapeHtml(todo.text)}"
                    data-edit-id="${todo.id}"
                    class="flex-1 px-3 py-2 border border-indigo-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    autofocus
                >
                <button 
                    class="save-edit-btn bg-green-100 hover:bg-green-200 text-green-600 px-3 py-1 rounded text-sm font-medium transition duration-200"
                    data-id="${todo.id}"
                >
                    Save
                </button>
                <button 
                    class="cancel-edit-btn bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1 rounded text-sm font-medium transition duration-200"
                    data-id="${todo.id}"
                >
                    Cancel
                </button>
            `;
            
            // Save button listener
            const saveBtn = todoItem.querySelector('.save-edit-btn');
            saveBtn.addEventListener('click', () => saveEdit(todo.id));
            
            // Cancel button listener
            const cancelBtn = todoItem.querySelector('.cancel-edit-btn');
            cancelBtn.addEventListener('click', cancelEdit);
            
            // Save on Enter, cancel on Escape
            const editInput = todoItem.querySelector(`input[data-edit-id="${todo.id}"]`);
            editInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') saveEdit(todo.id);
            });
            editInput.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') cancelEdit();
            });
        } else {
            // Normal view
            todoItem.className = `flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-200 group`;
            
            todoItem.innerHTML = `
                <input 
                    type="checkbox" 
                    ${todo.completed ? 'checked' : ''} 
                    class="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                    data-id="${todo.id}"
                >
                <span class="flex-1 text-gray-800 ${todo.completed ? 'line-through text-gray-400' : ''}">
                    ${escapeHtml(todo.text)}
                </span>
                <button 
                    class="edit-btn opacity-0 group-hover:opacity-100 bg-blue-100 hover:bg-blue-200 text-blue-600 px-3 py-1 rounded text-sm font-medium transition duration-200"
                    data-id="${todo.id}"
                >
                    Edit
                </button>
                <button 
                    class="delete-btn opacity-0 group-hover:opacity-100 bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1 rounded text-sm font-medium transition duration-200"
                    data-id="${todo.id}"
                >
                    Delete
                </button>
            `;

            // Checkbox event listener
            const checkbox = todoItem.querySelector('input[type="checkbox"]');
            checkbox.addEventListener('change', () => {
                toggleTodo(todo.id);
            });

            // Edit button event listener
            const editBtn = todoItem.querySelector('.edit-btn');
            editBtn.addEventListener('click', () => {
                startEdit(todo.id);
            });

            // Delete button event listener
            const deleteBtn = todoItem.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => {
                deleteTodo(todo.id);
            });
        }

        todoList.appendChild(todoItem);
    });

    updateStats();
}

// Update statistics
function updateStats() {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const remaining = total - completed;

    totalTasksEl.textContent = total;
    completedTasksEl.textContent = completed;
    remainingTasksEl.textContent = remaining;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Local storage functions
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    const saved = localStorage.getItem('todos');
    todos = saved ? JSON.parse(saved) : [];
}

// Start the app when DOM is ready
document.addEventListener('DOMContentLoaded', init);
