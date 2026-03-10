# MySQL database (XAMPP / phpMyAdmin)

## Quick setup

1. Start **Apache** and **MySQL** in XAMPP.
2. Open **phpMyAdmin**: http://localhost/phpmyadmin
3. Open the **SQL** tab.
4. Copy the contents of `setup.sql` and paste into the SQL box, then click **Go**.

This creates the database `prmd`, the tables (`Student`, `ChatSession`, `ChatMessage`), and sample student rows.

5. In the project root, create a `.env` file (copy from `.env.example`) and set:

   ```env
   DATABASE_URL="mysql://root:@localhost:3306/prmd"
   ```

   Use your MySQL username and password if they are different (e.g. `mysql://root:yourpassword@localhost:3306/prmd`).

6. Restart the app (`npm run dev`) and open **Admin → Database** to test the connection, or **Admin → Students** to see the data.
