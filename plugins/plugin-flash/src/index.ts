export interface FlashPlayerOptions {
  src: string;
  width?: string | number;
  height?: string | number;
  autoplay?: 'on' | 'off';
  backgroundColor?: string;
  letterbox?: 'on' | 'off';
  onLoad?: (player: any) => void;
  onError?: (error: any) => void;
}

export function createFlashPlayer(container: HTMLElement, options: FlashPlayerOptions) {
  const {
    src,
    width = '100%',
    height = '100%',
    autoplay = 'on',
    backgroundColor = '#000000',
    letterbox = 'on',
    onLoad,
    onError
  } = options;

  let player: any = null;

  const loadRuffle = () => {
    return new Promise((resolve, reject) => {
      if ((window as any).RufflePlayer) {
        resolve((window as any).RufflePlayer);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@ruffle-rs/ruffle';
      script.onload = () => resolve((window as any).RufflePlayer);
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  const init = async () => {
    try {
      const RufflePlayer = await loadRuffle() as any;
      const ruffle = RufflePlayer.newest();
      player = ruffle.createPlayer();
      
      container.appendChild(player);
      player.style.width = typeof width === 'number' ? `${width}px` : width;
      player.style.height = typeof height === 'number' ? `${height}px` : height;
      
      player.load({
        url: src,
        parameters: '',
        autoplay,
        backgroundColor,
        letterbox,
        warnOnUnsupportedContent: true,
      });

      if (onLoad) onLoad(player);
    } catch (error) {
      console.error('Failed to load Ruffle:', error);
      if (onError) onError(error);
    }
  };

  init();

  return {
    destroy: () => {
      if (player && player.remove) {
        player.remove();
      }
    },
    getPlayer: () => player
  };
}

export type FlashPlayerInstance = ReturnType<typeof createFlashPlayer>;
