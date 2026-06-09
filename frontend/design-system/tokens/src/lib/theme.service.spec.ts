import { vitest as vi, describe, it, expect, beforeEach, beforeAll, afterEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { ThemeService, THEME_TOKENS_PATH } from './theme.service';
import { DOCUMENT } from '@angular/common';

describe('ThemeService', () => {
  let service: ThemeService;
  let mockDocument: {
    head: {
      appendChild: ReturnType<typeof vi.fn>;
    };
    getElementById: ReturnType<typeof vi.fn>;
    createElement: ReturnType<typeof vi.fn>;
    documentElement: {
      style: {
        setProperty: ReturnType<typeof vi.fn>;
      };
      setAttribute: ReturnType<typeof vi.fn>;
    };
  };

  beforeAll(() => {
    try {
      TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    } catch (e) {
      // already initialized
    }
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  beforeEach(() => {
    mockDocument = {
      head: {
        appendChild: vi.fn(),
      },
      getElementById: vi.fn(),
      createElement: vi.fn().mockReturnValue({ id: '', rel: '', href: '' }),
      documentElement: {
        style: {
          setProperty: vi.fn()
        },
        setAttribute: vi.fn()
      }
    };

    TestBed.configureTestingModule({
      providers: [
        ThemeService,
        { provide: DOCUMENT, useValue: mockDocument }
      ]
    });
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set data-theme attribute on root', () => {
    service.switchTheme('base');
    expect(mockDocument.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'base');
  });

  it('should switch theme and load css file correctly', () => {
    service.switchTheme('brand1');

    expect(mockDocument.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'brand1');
    expect(mockDocument.createElement).toHaveBeenCalledWith('link');
    expect(mockDocument.head.appendChild).toHaveBeenCalled();

    // We expect the link to be updated with the correct path
    const createdLink = mockDocument.createElement.mock.results[0].value;
    expect(createdLink.id).toBe('brand-theme-link');
    expect(createdLink.href).toBe('/tokens/web/base/tokens.css');
  });

  it('should use custom tokens path if provided', () => {
    // Reconfigure the service with a different injection for testing
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        ThemeService,
        { provide: DOCUMENT, useValue: mockDocument },
        { provide: THEME_TOKENS_PATH, useValue: '/custom/path' }
      ]
    });
    service = TestBed.inject(ThemeService);
    service.switchTheme('brand1');

    const createdLink = mockDocument.createElement.mock.results[0].value;
    expect(createdLink.href).toBe('/custom/path/base/tokens.css');
  });
});
