type DomReturnType = HTMLElement | Node[] | null;
type DomTypeParam = 'node' | 'nodelist';

export default function $(sel: string, type?: DomTypeParam): DomReturnType {
  const els: Node[] = Array.from(document.querySelectorAll(sel));
  if (type === 'nodelist') {
    return Array.from(els);
  }

  if (type === 'node' || (els && els.length === 1)) {
    return els[0] as HTMLElement;
  }

  return els;
}
