import requests
import json

def send_ntfy_message(message, topic, priority='normal', tag=None, url='https://example.com/ntfy'):
    try:
        # 构建请求的headers
        headers = {
            'Content-Type': 'application/json'
        }

        # 构建请求的body
        body = {
            'topic': topic,
            'message': message,
            'priority': priority
        }
        if tag is not None:
            body['tag'] = tag

        # 发送POST请求到ntfy服务
        response = requests.post(url, headers=headers, json=body)

        # 检查响应状态
        if response.status_code != 200:
            raise Exception(f'HTTP error! status: {response.status_code}')

        # 打印响应数据
        print('Message sent successfully:', response.json())
    except Exception as e:
        print('Failed to send message:', e)

# 使用示例
send_ntfy_message('Hello, this is a test message!', 'testTopic', 'high', 'urgent')
