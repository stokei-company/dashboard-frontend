import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Flex, FormControl, FormHelperText, FormLabel } from '@chakra-ui/react';
import React, {
  ChangeEvent,
  forwardRef,
  memo,
  ReactNode,
  useCallback,
  useMemo,
  useState
} from 'react';
import { getFileURL } from '~/utils/get-file-url';
import { Input } from '../input';
import { VideoPlayer } from '../video-player';

interface InputFileVideoProps {
  readonly id?: string;
  readonly label?: string;
  readonly accept?: string;
  readonly modalTitle?: string;
  readonly formats?: string[];
  readonly helperMessage?: string;
  readonly errorMessage?: string;
  readonly previewElement?: (fileUrl: string) => ReactNode;
  readonly onPreview?: (fileUrl: string) => void;
  readonly onChange: (video: any) => void;
}

export const InputFileVideo: React.FC<InputFileVideoProps> = memo(
  forwardRef(
    (
      {
        id,
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
        (e: ChangeEvent<HTMLInputElement>) => {
          const file: any = e.target.files && e.target.files[0];
          onChange(file);
          // Get this url from response in real world.
          const fileURL = getFileURL(file);
          if (onPreview) {
            onPreview(fileURL);
          }
          setFileName(file.name || file.key);
          setPreviewUrl(fileURL);
          setLoading(false);
        },
        [onChange, onPreview]
      );

      const acceptFormatsString = useMemo(() => {
        if (accept) {
          return accept;
        }
        if (formats?.length > 0) {
          return formats?.join(',');
        }
        return 'video/mp4';
      }, [accept, formats]);

      const inputId = useMemo(() => 'input-' + id, [id]);
      const handleClickInput = () => {
        document.getElementById(inputId).click();
      };

      return (
        <FormControl id={id} marginBottom={2}>
          {label && <FormLabel>{label}</FormLabel>}

          <Input
            id={inputId}
            onChange={handleChange}
            type="file"
            accept={acceptFormatsString}
            display="none"
          />

          {previewUrl || fileName ? (
            <Flex width="full">
              {previewElement ? (
                previewElement(previewUrl)
              ) : (
                <VideoPlayer url={previewUrl} />
              )}
            </Flex>
          ) : (
            <Flex
              width="full"
              height="full"
              flexDir="column"
              alignItems="center"
              justifyContent="center"
              paddingY={5}
              onClick={() => handleClickInput()}
              borderWidth="thin"
              borderStyle="dashed"
              cursor="pointer"
              backgroundColor="#fafafa"
              _hover={{
                backgroundColor: 'gray.50'
              }}
            >
              {loading ? <LoadingOutlined /> : <PlusOutlined />}
              <Flex marginTop={2}>Adicionar arquivo</Flex>
            </Flex>
          )}

          {errorMessage && (
            <FormHelperText color="red.500">{errorMessage}</FormHelperText>
          )}

          {helperMessage && <FormHelperText>{helperMessage}</FormHelperText>}
        </FormControl>
      );
    }
  )
);
InputFileVideo.displayName = 'InputFileVideo';
