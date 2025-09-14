import { Alert } from 'react-native';

type ToastProps = {
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
};

const toast = (props: ToastProps) => {
  const { title, description } = props;
  Alert.alert(title, description);
};

const useToast = () => {
  return { toast };
};

export { useToast, toast };
