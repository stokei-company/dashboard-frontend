import {
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Text
} from '@chakra-ui/react';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import stylesMarkdown from '~/components/ui/markdown/markdown.module.css';
import styles from './style.module.css';

export interface TextEditorProps {
  readonly id?: string;
  readonly label?: string;
  readonly required?: boolean;
  readonly name?: string;
  readonly initialValue?: string;
  readonly helperMessage?: string;
  readonly errorMessage?: string;
  readonly onChange: (value: string) => void;
}

export const TextEditor: React.FC<TextEditorProps> = forwardRef(
  (
    {
      id,
      label,
      name,
      required = true,
      helperMessage,
      errorMessage,
      onChange,
      initialValue,
      ...props
    },
    ref
  ) => {
    const [editorLoaded, setEditorLoaded] = useState(false);

    const editorRef = useRef<any>();
    const { CKEditor, ClassicEditor }: any = editorRef.current || {};

    useEffect(() => {
      editorRef.current = {
        CKEditor: require('@ckeditor/ckeditor5-react').CKEditor, // v3+
        ClassicEditor: require('@ckeditor/ckeditor5-build-classic')
      };
      setEditorLoaded(true);
    }, []);

    return (
      <FormControl id={id} marginBottom={2}>
        {label && (
          <FormLabel>
            {label}
            {!required && (
              <Text
                as="span"
                marginLeft={3}
                color="gray.500"
                fontWeight="normal"
              >
                (Opcional)
              </Text>
            )}
          </FormLabel>
        )}

        <Flex
          className={
            styles['text-editor'] + ' ' + stylesMarkdown['markdown-body']
          }
          width="full"
        >
          {editorLoaded ? (
            <CKEditor
              //type=""
              name={name}
              editor={ClassicEditor}
              config={{
                allowedContent: true,
                extraAllowedContent: '*{*}',
                toolbar: [
                  'heading',
                  '|',
                  'bold',
                  'italic',
                  'link',
                  'numberedList',
                  'bulletedList',
                  '|',
                  'undo',
                  'redo'
                ]
              }}
              data={initialValue}
              onChange={(event, editor) => onChange(editor?.getData())}
            />
          ) : (
            <Flex>Editor carregando...</Flex>
          )}
        </Flex>

        {errorMessage && (
          <FormHelperText color="red.500">{errorMessage}</FormHelperText>
        )}

        {helperMessage && <FormHelperText>{helperMessage}</FormHelperText>}
      </FormControl>
    );
  }
);
