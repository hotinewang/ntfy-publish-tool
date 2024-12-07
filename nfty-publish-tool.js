/**
 * 发送推送消息到ntfy服务
 * @param {string} message - 要发送的消息内容
 * @param {string} topic - 消息的主题
 * @param {string} [priority='normal'] - 消息的优先级，可以是 'low', 'normal', 或 'high'
 * @param {string} [tag] - 消息的标签
 * @param {string} [url='https://example.com/ntfy'] - ntfy服务的URL
 */
async function sendNtfyMessage(message, topic, priority = 'normal', tag, url = 'https://example.com/ntfy') {
  try {
    // 构建请求的headers
    const headers = new Headers({
      'Content-Type': 'application/json',
    });

    // 构建请求的body
    const body = JSON.stringify({
      topic: topic,
      message: message,
      priority: priority,
      tag: tag ? tag : undefined // 如果tag未指定，则不包含在请求中
    });

    // 发送POST请求到ntfy服务
    const response = await fetch(url, { method: 'POST', headers: headers, body: body });

    // 检查响应状态
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 获取响应数据
    const data = await response.json();
    console.log('Message sent successfully:', data);
  } catch (error) {
    console.error('Failed to send message:', error);
  }
}

// 使用示例
sendNtfyMessage('Hello, this is a test message!', 'testTopic', 'high', 'urgent');
