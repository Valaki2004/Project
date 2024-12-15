import { SafeHtmlPipe } from './safe-html.pipe';
import { DomSanitizer } from '@angular/platform-browser';

describe('SafeHtmlPipe', () => {
  let pipe: SafeHtmlPipe;
  let sanitizer: jasmine.SpyObj<DomSanitizer>;

  beforeEach(() => {
    sanitizer = jasmine.createSpyObj('DomSanitizer', ['bypassSecurityTrustHtml']);
    sanitizer.bypassSecurityTrustHtml.and.returnValue('safe-html');
    pipe = new SafeHtmlPipe(sanitizer);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('should transform HTML content', () => {
    const result = pipe.transform('<div></div>');
    expect(result).toBe('safe-html');
    expect(sanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith('<div></div>');
  });
});
