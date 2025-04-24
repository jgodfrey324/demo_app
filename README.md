# Next.js + Redux Toolkit + Tailwind CSS Starter Setup

> **Node.js:** `v23.11.0`  
> **npm:** `v11.3.0`

A simple setup combining Next.js, Redux Toolkit (with `next-redux-wrapper`), Tailwind CSS, and Redux Logger for development.

## 🚀 Getting Started

### Create Your App

```bash
npx create-next-app@13.5.11 my-app
cd my-app
```

---

<br>

### 📦 Install Dependencies

```bash
npm install @reduxjs/toolkit react-redux
npm install next-redux-wrapper
npm install tailwindcss postcss autoprefixer
npm install redux-logger
```

---

<br>

### 🎨 Configure Tailwind CSS
`Update tailwind.config.js:`

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',  
    './src/components/**/*.{js,ts,jsx,tsx}',  
    './src/features/**/*.{js,ts,jsx,tsx}',  
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

---

<br>

### 🧠 Setup Redux Toolkit & next-redux-wrapper
Folder structure:
```css
src/
└── store/
    └── configureStore.js
```
`Create configureStore.js:`

```js
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'
import counterReducer from '@/features/counters/counterSlice'
import logger from 'redux-logger';

const combinedReducer = combineReducers({
    counter: counterReducer
  })
  
const rootReducer = (state, action) => {
    if (action.type === HYDRATE) {
        return {
            ...state,
            ...action.payload,
        }
    }
        return combinedReducer(state, action)
    }
  

const makeStore = () =>
    configureStore({
        reducer: rootReducer,
        devTools: process.env.NODE_ENV !== 'production',
        middleware: (getDefaultMiddleware) =>
            process.env.NODE_ENV === 'development'
              ? getDefaultMiddleware().concat(logger)
              : getDefaultMiddleware(),
    });

export const wrapper = createWrapper(makeStore)
```

---

<br>

### ⚙️ Hook Redux into Next.js
`Update pages/_app.js:`

```js
import '@/styles/globals.css'
import { wrapper } from '@/store/configureStore'
import { Provider } from 'react-redux'

function App({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest)

  return (
    <Provider store={store}>
      <Component {...props.pageProps} />
    </Provider>
  )
}

export default App
```

---

<br>

### 📁 Create Redux Slice
Folder structure:
```css
src/
└── features/
    └── counters/
        └── counterSlice.js
```
`Create counterSlice.js:`

```js
import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1 },
    decrement: (state) => { state.value -= 1 },
  },
})

export const { increment, decrement } = counterSlice.actions
export default counterSlice.reducer
```

---

<br>

### 🧮 Create Counter Component
`Create features/counters/Counter.js:`

```js
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from '@/features/counters/counterSlice'

export default function Counter() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Counter: {count}</h1>
      <div className="space-x-4">
        <button
          onClick={() => dispatch(increment())}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Increment
        </button>
        <button
          onClick={() => dispatch(decrement())}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Decrement
        </button>
      </div>
    </div>
  )
}
```

---

<br>

### 📄 Use Redux in a Page
`Update pages/index.js:`

```js
import Counter from '@/features/counters/Counter'

export default function Home() {
  return (
    <main>
      <Counter />
    </main>
  )
}
```

---

<br>

### 📜 package.json Version Check
`Make sure your package.json has the following versions:`

```json
Copy
"dependencies": {
  "@reduxjs/toolkit": "^2.7.0",
  "next": "13.5.11",
  "next-redux-wrapper": "^8.1.0",
  "react": "^18",
  "react-dom": "^18",
  "react-redux": "^9.2.0",
  "redux-logger": "^3.0.6"
},
"devDependencies": {
  "autoprefixer": "^10.4.21",
  "postcss": "^8.5.3",
  "tailwindcss": "^3.4.17"
}
```
---

<br>

## 🧩 Recommended Developer Tools
<ol>
    <li><a href="https://chromewebstore.google.com/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd", target="blank">Redux DevTools (Chrome)</a></li>
    <li><a href="https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi", target="blank">React Developer Tools (Chrome)</a></li>
</ol>

<br>

## 🏃 Start the App
```bash
npm run dev
```

<br>
<br>

# That's it! You’re now ready to build something awesome 🧡
