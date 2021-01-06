import React, { useState, useRef } from 'react';
import { Form } from 'tea-component/lib/form';
import { Input } from 'tea-component/lib/input';
import { Upload } from 'tea-component/lib/upload';
import { Card } from 'tea-component/lib/card';
import { Text } from 'tea-component/lib/text';
import { Button } from 'tea-component/lib/button';
import { Modal } from "tea-component/lib/modal";

type IXMLHttpRequest = {
  xhr: XMLHttpRequest
}

type IPercent = {
  percent: any
}

export default function SettingForm() {
  const [file, setFile] = useState<any>(null);
  const [image, setImage] = useState<any>(null);
  const [status, setStatus] = useState<any>(null);
  const [percent, setPercent] = useState<any>(null);

  const xhrRef = useRef<any>(null);

  function handleStart(file: File, { xhr } : IXMLHttpRequest) {
    setFile(file);
    getBase64(file);
    setStatus('validating');
    xhrRef.current = xhr;
  }

  function handleProgress({ percent } : IPercent) {
    setPercent(percent);
  }

  function handleSuccess() {
    setStatus('success');
  }

  function handleError() {
    setStatus('error');
    Modal.alert({
      type: 'error',
      message: '错误',
      description: '请求服务器失败',
    });
  }

  function beforeUpload(file: File, fileList: File[], isAccepted: boolean) {
    if (!isAccepted) {
      setStatus('error');
    }
    return isAccepted;
  }

  function handleAbort() {
    if (xhrRef.current) {
      xhrRef.current.abort();
    }
    setFile(null);
    setStatus(null);
    setPercent(null);
  }

  function getBase64(file: File) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="example-stage">
      <Card>
        <Card.Body>
          <Form>
            <Form.Item label="团队名称">
              <Input placeholder="" defaultValue="BigFish" />
            </Form.Item>
            <Form.Item label="团队简介">
              <Input placeholder="简单介绍一下你的团队吧" multiline />
            </Form.Item>
            <Form.Item label="团队logo">
              <Upload
                action="//jsonplaceholder.typicode.com/posts/"
                accept="image/png"
                maxSize={1024 * 1024}
                onStart={handleStart}
                onProgress={handleProgress}
                onSuccess={handleSuccess}
                onError={handleError}
                beforeUpload={beforeUpload}>
                {({ open }) => (
                  <Upload.Image
                    filename={file ? file.name : <Text theme="weak">还未选择图片</Text>}
                    image={
                      file
                        ? image
                        : '//imgcache.qq.com/open_proj/proj_qcloud_v2/tea-style/dist/assets/image/upload-thumb.png'
                    }
                    percent={percent}
                    description={
                      file && (
                        <>
                          <p>文件大小：{Math.floor(file.size / 1024)}K</p>
                          <p>上传日期：-</p>
                        </>
                      )
                    }
                    button={
                      status === 'validating' ? (
                        <Button onClick={handleAbort}>取消上传</Button>
                      ) : (
                        <>
                          <Button onClick={open}>{status ? '重新上传' : '选择图片'}</Button>
                          {file && (
                            <Button type="link" style={{ marginLeft: 8 }} onClick={handleAbort}>
                              删除
                            </Button>
                          )}
                        </>
                      )
                    }
                  />
                )}
              </Upload>
            </Form.Item>
          </Form>
          <Form.Action>
            <Button type="primary">保存</Button>
            <Button>取消</Button>
          </Form.Action>
        </Card.Body>
      </Card>
    </div>
  );
}
