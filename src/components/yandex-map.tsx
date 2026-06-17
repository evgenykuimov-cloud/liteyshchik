"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    ymaps?: YmapsApi;
    __kamalitYmapsLoading?: Promise<void>;
  }
}

const DEFAULT_CENTER: [number, number] = [55.7436, 52.3958];

type YmapsMapInstance = {
  behaviors: { disable: (behavior: string) => void };
  geoObjects: { add: (geoObject: unknown) => void };
  setCenter: (coordinates: [number, number], zoom: number, options?: { duration: number }) => void;
  destroy: () => void;
};

type YmapsGeoObject = {
  geometry?: { getCoordinates?: () => [number, number] };
};

type YmapsGeocodeResponse = {
  geoObjects: { get: (index: number) => YmapsGeoObject | undefined };
};

type YmapsApi = {
  ready: (callback: () => void) => void;
  geocode: (address: string, options: { results: number }) => Promise<YmapsGeocodeResponse>;
  Map: new (
    element: HTMLElement,
    state: { center: [number, number]; zoom: number; controls: string[] },
  ) => YmapsMapInstance;
  Placemark: new (
    coordinates: [number, number],
    properties: { hintContent: string },
    options: Record<string, unknown>,
  ) => unknown;
  templateLayoutFactory: { createClass: (template: string) => unknown };
};

type YandexMapProps = {
  address: string;
  title: string;
  openHref: string;
};

export function YandexMap({ address, title, openHref }: YandexMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let destroyed = false;
    let map: YmapsMapInstance | undefined;

    loadYmaps()
      .then(() => {
        if (destroyed || !mapRef.current || !window.ymaps) return;

        window.ymaps.ready(() => {
          const ymaps = window.ymaps;
          if (destroyed || !mapRef.current || !ymaps) return;

          ymaps
            .geocode(address, { results: 1 })
            .then((response) => {
              if (destroyed || !mapRef.current) return;

              const first = response.geoObjects.get(0);
              const coordinates = first?.geometry?.getCoordinates?.() ?? DEFAULT_CENTER;

              map = new ymaps.Map(mapRef.current, {
                center: coordinates,
                zoom: 16,
                controls: ["zoomControl", "typeSelector", "fullscreenControl"],
              });

              map.behaviors.disable("scrollZoom");

              const markerLayout = ymaps.templateLayoutFactory.createClass(`
                <div style="position:relative; width:64px; height:82px; transform:translate(-32px,-82px); pointer-events:none;">
                  <img src="/images/kamalit-mark.png" alt="" style="position:absolute; left:8px; top:0; width:48px; height:48px; object-fit:contain; filter:drop-shadow(0 0 10px rgba(0,0,0,.85)) drop-shadow(0 0 8px rgba(255,255,255,.7));" />
                  <div style="position:absolute; left:24px; top:45px; width:16px; height:16px; transform:rotate(45deg); background:#111; border-right:1px solid rgba(255,255,255,.8); border-bottom:1px solid rgba(255,255,255,.8); box-shadow:4px 4px 8px rgba(0,0,0,.35);"></div>
                  <div style="position:absolute; left:50%; top:62px; transform:translateX(-50%); white-space:nowrap; border-radius:3px; background:#111; padding:4px 7px; color:#fff; font:700 10px/1 Arial,sans-serif; letter-spacing:.04em; text-transform:uppercase; box-shadow:0 0 10px rgba(0,0,0,.45);">${title}</div>
                </div>
              `);

              const placemark = new ymaps.Placemark(
                coordinates,
                { hintContent: title },
                {
                  iconLayout: markerLayout,
                  iconShape: {
                    type: "Rectangle",
                    coordinates: [
                      [-32, -82],
                      [32, 0],
                    ],
                  },
                },
              );

              map.geoObjects.add(placemark);
              map.setCenter(coordinates, 16, { duration: 0 });
            })
            .catch(() => setFailed(true));
        });
      })
      .catch(() => setFailed(true));

    return () => {
      destroyed = true;
      map?.destroy?.();
    };
  }, [address, title]);

  if (failed) {
    return (
      <div className="grid min-h-[360px] place-items-center bg-[var(--background-secondary)] p-6 text-center sm:min-h-[440px]">
        <div>
          <p className="text-sm text-[var(--foreground-muted)]">
            Карту не удалось загрузить. Адрес производства: {address}.
          </p>
          <a href={openHref} target="_blank" rel="noreferrer" className="mt-4 inline-block text-sm font-bold text-[var(--accent)] underline underline-offset-4">
            Открыть в Яндекс Картах →
          </a>
        </div>
      </div>
    );
  }

  return <div ref={mapRef} className="h-[360px] w-full bg-[#eef1f4] sm:h-[440px]" />;
}

function loadYmaps() {
  if (window.ymaps) return Promise.resolve();
  if (window.__kamalitYmapsLoading) return window.__kamalitYmapsLoading;

  window.__kamalitYmapsLoading = new Promise<void>((resolve, reject) => {
    const apiKey = process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY;
    const script = document.createElement("script");
    script.src = `https://api-maps.yandex.ru/2.1/?lang=ru_RU${apiKey ? `&apikey=${apiKey}` : ""}`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Yandex Maps API failed to load"));
    document.head.appendChild(script);
  });

  return window.__kamalitYmapsLoading;
}
