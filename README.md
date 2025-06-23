# Auth/Scripts
Various scripts for handling one off administrative in bulk operation. 

## Install & Setup
1. **Clone The Repo**

   ```
   git clone https://github.com/heuwoe/firebase-scripts.git
   cd firebase-scripts
   ```
2. **Install Dependencies**

   ```
   npm i
   ```
3. **Add your Firebase permissions file**

   Place your Firebase service account JSON file in the **root directory of the project**.
   
   Make sure you have an **existing firebase project** and **permissions configured properly.**
4. **Run an action**
   ```
   npm run <actionName>
   ```
   Replace ```<actionName>``` with the operations you want to execute
   

## Operations
Action Description (actionName)
- [Add Users From JSON (`usersFromJson`)](#add-users-from-json)

### Add Users From JSON
This operation reads a `users.json` file **from your project’s root directory**.  
It must contain an array of objects with a valid `email` and `fullName` (or `name`, `username`, or `userName`).  
Each user is created in Firebase Authentication with a default password generated from their name.

**File Requirement:**  
✅ File must be named `users.json`  
✅ File must be in the **root directory**

**Default Password Format:**  
- If a full name with a last name exists:  
  **Uppercase first letter of last name + first 6 letters of first name**  
  Example: `"John Doe"` → `DJohndo`  
- If no last name is present:  
  **Uppercase first letter of first name + next 6 letters**  
  Example: `"Cher"` → `Cher`

> ⚠️ **Disclaimer:**  
> This script generates **predictable default passwords** and is **not secure** for production.  
> Users **must change their passwords immediately** after account creation.  
> Do **not publicly share** that this tool was used, as it exposes the password pattern.