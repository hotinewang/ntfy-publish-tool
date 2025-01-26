/**
 * 发送推送消息到ntfy服务
 * @param {string} topic - 消息的主题（必填）
 * @param {string} message - 要发送的消息内容（必填）
 * @param {string} title - 消息的大标题(默认不使用大标题)
 * @param {int} [priority=3] - 消息的优先级（默认是3），可以是1-5的整数，分别是最小、小、默认、大、最大
 * @param {array} [tags] - 消息的标签,字符串数组（默认无）
 * @param {array} [attach] - 附件、图片URL（默认无）
 * @param {array} [click] - 消息被点击时跳转的url（默认无）
 * @param {string} [serverUrl='https://ntfy.sh'] - ntfy服务的URL,默认为官方服务器
 */
async function sendNtfyMessage(topic, message, title = null,  priority = 3, tags = null, attach = null , click = null , serverUrl = 'https://ntfy.sh') {
  try {
    if(topic==null || message==null || priority >5 ||priority <1){
      console.error("topic、message不能为空，priority的值只能取1、2、3、4、5!");
    }

    // 构建请求的headers
    const headers = new Headers({
      'Content-Type': 'application/json',
    });

    // 创建消息Object
    const payload={topic,message,priority};
    if(title)  payload.title = title;
    if(tags) payload.tags = tags;
    if(attach) payload.attach = attach;
    if(click) payload.click = click;

    // 构建请求的body
    const body = JSON.stringify(payload);
    console.log('拟发出的消息body:', body);

    // 发送POST请求到ntfy服务
    const response = await fetch(serverUrl, { method: 'POST', headers: headers, body: body });

    // 检查响应状态
    if (!response.ok) {
      throw new Error(`HTTP 错误! 状态: ${response.status}`);
    }

    // 获取响应数据
    const data = await response.json();
    console.log('消息发送成功:\n', data);
  } catch (error) {
    console.error('消息发送失败:\n', error);
  }
}

// 使用示例
sendNtfyMessage('hotine','这是一条测试用的MSG', '测试信息',4,['loudspeaker','skull','hugging_face','hotine']);
