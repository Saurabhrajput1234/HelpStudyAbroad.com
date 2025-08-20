# E-commerce Product Page 

This is a **Next.js e-commerce product page** with cart, recently viewed products, and performance improvements.

---

##  Before (Issues) 
- Product page SSR was broken.   
- Color & size selections didn’t sync properly.   
- Cart allowed adding without selecting options.   
- Duplicate navbar appeared on landing page.   

---

## 🔧 After (Fixes & Features)
- Fixed SSR with correct data fetching.   
- Synced color → size selections with defaults.   
- Cart now validates color & size before adding.   
- Cleaned up layout (removed duplicate navbar).   
- Added **Recently Viewed Products** (last 3 via localStorage).   
- Added **Cart with persistence** (localStorage + global state).   
- Optimized images with Next.js `<Image />`.   
- Improved load speed with client-side caching (5 mins).   
