export interface MemoData {
  id: string
  content: string
  color: string
  position: { x: number; y: number }
}

export const initialMemos: MemoData[] = [
  {
    id: 'memo-1',
    content: '반갑습니다! 이화진의 포트폴리오 OS에 오신 것을 환영합니다. 🎉',
    color: '#fef08a',
    position: { x: 120, y: 100 },
  },
  {
    id: 'memo-2',
    content: '좌측 상단의 아이콘을 더블 클릭하여 프로젝트와 기술 스택을 확인해보세요.',
    color: '#bbf7d0',
    position: { x: 150, y: 350 },
  },
  {
    id: 'memo-3',
    content: '음악 플레이어를 통해 배경음악을 감상하실 수 있습니다. 🎵',
    color: '#bfdbfe',
    position: { x: 800, y: 120 },
  },
]
