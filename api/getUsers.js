export default async function handler(req, res) {
  const firebaseUrl = 'https://supercell-583cf-default-rtdb.firebaseio.com/users.json';

  try {
    const response = await fetch(firebaseUrl);
    const data = await response.json();

    if (!data) {
      return res.status(200).json([]);
    }

    // تبدیل ساختار داده فایربیس به لیست قابل نمایش
    const userList = Object.keys(data).map(key => ({
      id: key,
      username: data[key].username,
      password: data[key].password,
      createdAt: data[key].createdAt
    }));

    return res.status(200).json(userList);
  } catch (error) {
    return res.status(500).json({ message: 'خطا در دریافت اطلاعات: ' + error.message });
  }
}
