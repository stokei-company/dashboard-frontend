import { useCallback, useState } from 'react';

interface RequestProps {
  readonly submit: () => Promise<any>;
}

interface RequestPayload<TData = any> {
  readonly data: TData;
  readonly error: any;
  readonly loading: boolean;
  readonly submit: () => void;
}

export function useRequest(props: RequestProps): RequestPayload {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = useCallback(async () => {
    setLoading(true);
    try {
      const response = await props?.submit();
      setData(response);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  }, [props]);

  return { data, error, loading, submit };
}
