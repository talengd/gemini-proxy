const axios = require('axios');

module.exports = async (req, res) => {
    // 示例：OpenAI的API URL
    //     const baseUrl = 'https://api.openai.com/v1/engines';
    const baseUrl = `https://gemini-api.ai-btm.cn/v1/models/gemini-pro:generateContent?key=${process.env.OPENAI_API_KEY}`;

    // 配置请求头
    const headers = {
        // 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, // 使用环境变量存储API密钥
        'Content-Type': 'application/json',
        // 添加任何其他需要的头部
    };

    try {
        let response;

        // 根据请求类型处理请求
        switch (req.method) {
            case 'GET':
                response = await axios.get(baseUrl, { headers });
                break;
            case 'POST':
                response = await axios.post(baseUrl, req.body, { headers });
                break;
            // 添加其他HTTP方法的处理逻辑，如PUT、DELETE等
            default:
                return res.status(405).json({ error: 'Method Not Allowed' });
        }

        // 返回从OpenAI API获取的响应
        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(error.response.status).json({ error: error.message });
    }
};
