import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Flex, FormControl, FormHelperText, FormLabel } from '@chakra-ui/react';
import { message, Upload } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import React, { ReactNode, useCallback, useState } from 'react';
import { useMemo } from 'react';
import { forwardRef } from 'react';
import { getFileURL } from '~/utils/get-file-url';
import styles from './style.module.css';

export interface InputFileProps {
  readonly id?: string;
  readonly label?: string;
  readonly accept?: string;
  readonly modalTitle?: string;
  readonly formats?: string[];
  readonly helperMessage?: string;
  readonly errorMessage?: string;
  readonly previewElement?: (fileUrl: string) => ReactNode;
  readonly onPreview?: (fileUrl: string) => void;
  readonly onChange: (event: { target: { files: any[] } }) => void;
}

export const InputFile: React.FC<InputFileProps> = forwardRef(
  (
    {
      label,
      formats,
      helperMessage,
      errorMessage,
      accept,
      onChange,
      onPreview,
      previewElement,
      ...props
    },
    ref
  ) => {
    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleChange = useCallback(
      (info: UploadChangeParam<UploadFile<any>>) => {
        if (info.file.status === 'uploading') {
          setLoading(true);
          return;
        }
        if (info.file.status === 'done') {
          onChange({ target: { files: [info.file.originFileObj] } });
          // Get this url from response in real world.
          const fileURL = getFileURL(info.file.originFileObj);
          if (onPreview) {
            onPreview(fileURL);
          }
          setFileName(info.file.name);
          setPreviewUrl(fileURL);
          setLoading(false);
        }
      },
      [onChange, onPreview]
    );

    const beforeUpload = useCallback(
      (file) => {
        let isValid = true;
        if (formats?.length > 0) {
          isValid = formats.some(
            (format) => file.type.toLowerCase() === format.toLowerCase()
          );
        }
        if (!isValid) {
          message.error('Formato de arquivo não permitido!');
        }
        const isValidSize = file.size / 5368709120 < 5; // 1024 * 1024 * 1024 * 5
        if (!isValidSize) {
          message.error('O video deve ser menor que 5GB!');
        }
        return isValid && isValidSize;
      },
      [formats]
    );

    const acceptFormatsString = useMemo(() => {
      if (accept) {
        return accept;
      }
      return formats?.join(',');
    }, [accept, formats]);

    return (
      <FormControl id={props.id} marginBottom={2}>
        {label && <FormLabel>{label}</FormLabel>}

        <Upload
          name="file"
          listType="picture-card"
          className={styles['file-uploader']}
          accept={acceptFormatsString}
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={handleChange}
          {...props}
        >
          {previewUrl || fileName ? (
            <Flex padding={2} width="full">
              {previewElement ? previewElement(previewUrl) : fileName}
            </Flex>
          ) : (
            <Flex
              width="full"
              height="full"
              flexDir="column"
              alignItems="center"
              justifyContent="center"
              paddingY={5}
            >
              {loading ? <LoadingOutlined /> : <PlusOutlined />}
              <Flex marginTop={2}>Adicionar arquivo</Flex>
            </Flex>
          )}
        </Upload>

        {errorMessage && (
          <FormHelperText color="red.500">{errorMessage}</FormHelperText>
        )}

        {helperMessage && <FormHelperText>{helperMessage}</FormHelperText>}
      </FormControl>
    );
  }
);
InputFile.displayName = 'InputFile';
