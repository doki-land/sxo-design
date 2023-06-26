export interface DialogStylesOptions {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  isCentered?: boolean;
}

/**
 * 获取对话框各部分的样式类名
 */
export function getDialogClasses(options: DialogStylesOptions = {}) {
  const { size = 'md', isCentered = true } = options;

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full m-0 h-full',
  };

  return {
    overlay: 'fixed inset-0 z-50 bg-black/80 backdrop-blur-sm transition-opacity duration-300',
    container: `fixed inset-0 z-50 flex items-center justify-center p-4 ${isCentered ? 'items-center' : 'items-start pt-20'}`,
    content: `relative w-full ${sizes[size]} bg-white border-4 border-primary shadow-hard-accent p-8 transition-all duration-300`,
    header: 'mb-6 flex flex-col space-y-2',
    title: 'text-2xl font-black uppercase tracking-tighter text-primary',
    description: 'text-neutral-500 text-sm font-medium',
    closeButton:
      'absolute right-6 top-6 p-2 text-primary hover:bg-accent-vivid hover:text-white transition-colors border-2 border-primary',
    footer: 'mt-8 flex justify-end space-x-4',
  };
}
