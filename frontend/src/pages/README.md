# Frontend Page Structure

## Directory Organization

```
src/pages/
├── Auth/                 # Authentication related pages
│   ├── LoginPage.jsx
│   └── SignUpPage.jsx
│
├── Shop/                 # E-commerce related pages
│   ├── Shop.jsx
│   ├── CartPage.jsx
│   └── Cart.jsx
│
├── Chat/                 # Chat related pages
│   ├── ChatPage.jsx
│   ├── ChatContainer.jsx
│   ├── ChatHeader.jsx
│   ├── MessageInput.jsx
│   ├── NoChatSelected.jsx
│   └── Sidebar.jsx
│
├── Admin/                # Admin related pages
│   └── ProductPage.jsx
│
└── Common/               # Common pages
    ├── Home.jsx
    ├── About.jsx
    ├── Contact.jsx
    ├── Projects.jsx
    ├── Service.jsx
    └── ProfilePage.jsx
```

## Import Path Updates

### Auth Pages
```javascript
// Old import
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";

// New import
import LoginPage from "../pages/Auth/LoginPage";
import SignUpPage from "../pages/Auth/SignUpPage";
```

### Shop Pages
```javascript
// Old import
import Shop from "../pages/Shop";
import CartPage from "../pages/CartPage";
import Cart from "../pages/Cart";

// New import
import Shop from "../pages/Shop/Shop";
import CartPage from "../pages/Shop/CartPage";
import Cart from "../pages/Shop/Cart";
```

### Chat Pages
```javascript
// Old import
import ChatPage from "../pages/ChatPage";
import ChatContainer from "../pages/ChatContainer";
import ChatHeader from "../pages/ChatHeader";
import MessageInput from "../pages/MessageInput";
import NoChatSelected from "../pages/NoChatSelected";
import Sidebar from "../pages/Sidebar";

// New import
import ChatPage from "../pages/Chat/ChatPage";
import ChatContainer from "../pages/Chat/ChatContainer";
import ChatHeader from "../pages/Chat/ChatHeader";
import MessageInput from "../pages/Chat/MessageInput";
import NoChatSelected from "../pages/Chat/NoChatSelected";
import Sidebar from "../pages/Chat/Sidebar";
```

### Admin Pages
```javascript
// Old import
import ProductPage from "../pages/AdminPage/ProductPage";

// New import
import ProductPage from "../pages/Admin/ProductPage";
```

### Common Pages
```javascript
// Old import
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Projects from "../pages/Projects";
import Service from "../pages/Service";
import ProfilePage from "../pages/ProfilePage";

// New import
import Home from "../pages/Common/Home";
import About from "../pages/Common/About";
import Contact from "../pages/Common/Contact";
import Projects from "../pages/Common/Projects";
import Service from "../pages/Common/Service";
import ProfilePage from "../pages/Common/ProfilePage";
```

## Migration Steps

1. Create the new directory structure
2. Move files to their respective directories
3. Update all import statements in the files
4. Update route configurations in App.jsx
5. Test the application to ensure all imports work correctly

## Benefits

- Better organization of related components
- Clearer separation of concerns
- Easier maintenance and navigation
- More scalable structure for future additions 