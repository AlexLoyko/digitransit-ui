const CONFIG = process.env.CONFIG || 'default';
const API_URL = process.env.API_URL || 'https://beta.planmytrip.nyc/api';
const MAP_URL = process.env.MAP_URL || 'https://planmytrip.nyc/api';
const APP_PATH = process.env.APP_PATH || '';
const APP_URL = process.env.APP_URL || 'https://planmytrip.nyc/';
const APP_DESCRIPTION = 'MTA All Agency App Trip Planner BETA';
const OTP_TIMEOUT = process.env.OTP_TIMEOUT || 10000;
const MQTT_URL = APP_URL.replace("https", "wss").replace("http", "ws");

export default {
  CONFIG,
  OTPTimeout: OTP_TIMEOUT,
  URL: {
    API_URL,
    //OTP: `${API_URL}/routing/v1/routers/default/`,


    OTP: `http://localhost:9090/otp/routers/default/`,
    MAP: {
           default: `${API_URL}/map/v1/`,
    },
    PELIAS: `${API_URL}/geocoding/v1/search`,
    //PELIAS: `http://54.174.242.186:8080/v1/search`,
    PELIAS_REVERSE_GEOCODER: `${API_URL}/geocoding/v1/reverse`,
    //PELIAS_REVERSE_GEOCODER: `http://54.174.242.186:8080/v1/reverse`,
    STOP_MAP: `${MAP_URL}/stopmap/v1/`,
    //STOP_MAP: `http://localhost:9001/hsl-stop-map/`,
    MQTT: `${MQTT_URL}/wsapp/`,
    REALTIME: `${API_URL}/mtaBusLoc/vehiclePositions`
  },

  APP_PATH: `${APP_PATH}`,
  title: 'MTA Trip Planner',
  shouldShowIntro: false,
  feedIds: ['MTA','NJT','NJB', "MTA NYCT", "MTABC"],
  //feedIds: [''],
  feed_ids: ['MTA','NJT','NJB', "MTA NYCT", "MTABC"],

  // farecard icon names for a list of agencies
  fare_agencies: {
    METROCARD: ['MTA', 'MTABC', 'MTASBWY', 'PATH'],
  },

  searchSources: ['oa', 'osm', 'geonames', 'gtfs'],

  // search: {
  //    suggestions: {
  //     useTransportIcons: true,
  //   },
  //   usePeliasStops: false,
  //   mapPeliasModality: true,
  //    peliasMapping: { },
  //    peliasLayer: null,
  //   peliasLocalization: null,
  //   peliasLocalization: (feature) => {
  //     // localization example; showing locality (county) in label and name
  //     const localized = { ...feature };
  //     localized.properties.label = '';
  //     localized.properties.name = '';
  //     return localized;
  //   },
  // },

  contactName: {
    default: "MTA Trip Planner",
  },

  // Default labels for manifest creation
  name: 'MTA Trip Planner Beta',
  shortName: 'DigitransitMTA',

  searchParams: {},

 search: {
   suggestions: {
     useTransportIcons: false,
   },
   usePeliasStops: false,
   mapPeliasModality: false,
   peliasMapping: { },
   peliasLayer: null,
   peliasLocalization: null,
 },

  nearbyRoutes: {
    radius: 2000,
    bucketSize: 100,
  },

  maxWalkDistance: 10000,
  maxBikingDistance: 100000,
  availableLanguages: ['en'],
  defaultLanguage: 'en',
  // from https://github.com/moment/moment-timezone/blob/develop/data/packed/latest.json
  timezoneData: 'America/New_York|EST EDT EWT EPT|50 40 40 40|01010101010101010101010101010101010101010101010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261t0 1nX0 11B0 1nX0 11B0 1qL0 1a10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 RB0 8x40 iv0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|21e6',

  moment: {
    relativeTimeThreshold: {
      seconds: 55,
      minutes: 59,
      hours: 23,
      days: 26,
      months: 11,
    },
  },

  mainMenu: {
    // Whether to show the left menu toggle button at all
    show: true,
    showDisruptions: true,
    showInquiry: false,
    showLoginCreateAccount: true,
    showOffCanvasList: true,
  },

  feedback: {
    // Whether to allow the feedback popup
    enable: false,
  },

  itinerary: {
    // How long vehicle should be late in order to mark it delayed. Measured in seconds.
    delayThreshold: 180,
    // Wait time to show "wait leg"? e.g. 180 means over 3 minutes are shown as wait time.
    // Measured in seconds.
    waitThreshold: 180,
    enableFeedback: false,

    timeNavigation: {
      enableButtonArrows: false,
    },
  },

  initialLocation: {
    zoom: 11,
    lat: 40.705,
    lon: -74.012,
},

  nearestStopDistance: {
    maxShownDistance: 5000,
  },

  map: {
    useRetinaTiles: true,
    tileSize: 256,
    zoomOffset: 0,
    minZoom: 1,
    maxZoom: 18,
    useVectorTiles: true,
    controls: {
      zoom: {
        // available controls positions: 'topleft', 'topright', 'bottomleft, 'bottomright'
        position: 'bottomleft',
      },
      scale: {
        position: 'bottomright',
      },
    },
    genericMarker: {
      // Do not render name markers at zoom levels below this value
      nameMarkerMinZoom: 18,

      popup: {
        offset: [106, 16],
        maxWidth: 250,
        minWidth: 250,
      },
    },

    line: {
      halo: {
        weight: 7,
        thinWeight: 4,
      },

      leg: {
        weight: 5,
        thinWeight: 2,
      },
    },

    useModeIconsInNonTileLayer: false,
  },

  stopCard: {
    header: {
      showDescription: true,
      showStopCode: true,
      showDistance: true,
    },
  },

  autoSuggest: {
    // Let Pelias suggest based on current user location
    locationAware: true,
  },

  cityBike: {
    showCityBikes: false
  },

  // Lowest level for stops and terminals are rendered
  stopsMinZoom: 13,
  // Highest level when stops and terminals are still rendered as small markers
  stopsSmallMaxZoom: 14,
  // Highest level when terminals are still rendered instead of individual stops
  terminalStopsMaxZoom: 17,
  terminalStopsMinZoom: 12,
  terminalNamesZoom: 16,

  stopsIconSize: {
    small: 8,
    selected: 28,
    default: 18,
  },

  appBarLink: { name: 'MTA Time', href: 'http://aaa.mtabuscis.net/' },

  colors: {
    primary: '#00AFFF',
  },

  disruption: {
    showInfoButton: true,
  },

  agency: {
    show: true,
  },

  socialMedia: {
    title: 'Jetsons',
    description: APP_DESCRIPTION,
    locale: 'en_US',

    image: {
      url: '/img/default-social-share.png',
      width: 2400,
      height: 1260,
    },

    twitter: {
      card: 'summary_large_image',
      site: '@mta',
    },
  },

  meta: {
    description: APP_DESCRIPTION,
    keywords: 'MTA Time',
  }
,
  // Ticket information feature toggle
  showTicketInformation: true,
  showRouteInformation: false,

  modeToOTP: {
    bus: 'BUS',
    tram: 'TRAM',
    rail: 'RAIL',
    subway: 'SUBWAY',
    //citybike: 'BICYCLE_RENT',
    //airplane: 'AIRPLANE',
    ferry: 'FERRY',
    walk: 'WALK',
    bicycle: 'BICYCLE',
    car: 'CAR',
    car_park: 'CAR_PARK',
  },
  // Control what transport modes that should be possible to select in the UI
  // and whether the transport mode is used in trip planning by default.
  transportModes: {
    bus: {
      availableForSelection: true,
      defaultValue: true,
    },

    tram: {
      availableForSelection: false,
      defaultValue: false,
    },

    rail: {
      availableForSelection: true,
      defaultValue: true,
    },

    subway: {
      availableForSelection: true,
      defaultValue: true,
    },

    // TODO: Switch back in april
    citybike: {
      availableForSelection: false,
      defaultValue: false,
    },

    airplane: {
      availableForSelection: false,
      defaultValue: false,
    },

    ferry: {
      availableForSelection: true,
      defaultValue: false,
    },
  },

  streetModes: {
    walk: {
      availableForSelection: true,
      defaultValue: true,
      icon: 'walk',
    },

    bicycle: {
      availableForSelection: true,
      defaultValue: false,
      icon: 'bicycle-withoutBox',
    },

    car: {
      availableForSelection: true,
      defaultValue: false,
      icon: 'car-withoutBox',
    },

    car_park: {
      availableForSelection: false,
      defaultValue: false,
      icon: 'car_park-withoutBox',
    },
  },

  ticketOptions: [{
    displayName: 'No ticket zone limits',
    value: '0',
  }],

  accessibilityOptions: [{
    displayName: 'No restrictions',
    value: '0',
  }, {
    displayName: 'Wheelchair accessible',
    value: '1',
  }],

  showModeFilter: true,

  customizeSearch: {
    walkReluctance: {
      available: true,
    },

    walkBoardCost: {
      available: true,
    },

    transferMargin: {
      available: true,
    },

    walkingSpeed: {
      available: true,
    },

    ticketOptions: {
      available: false,
    },

    accessibility: {
      available: true,
    },
  },

  areaPolygon: [
    [-74.2501853, 40.497640600000004],
    [-74.26725400000001, 40.499914000000004],
    [-74.26745700000001, 40.503384000000004],
    [-74.2674978, 40.5067291],
    [-74.2675698, 40.5258015],
    [-74.26757330000001, 40.555613900000004],
    [-74.267578, 40.752708000000005],
    [-74.267578, 40.756028],
    [-74.26757, 40.918252],
    [-74.267521, 40.934925],
    [-74.2655445, 40.9358474],
    [-74.263284, 40.936323],
    [-74.248952, 40.93634],
    [-73.86423280000001, 40.93634],
    [-73.8426991, 40.9363399],
    [-73.791235, 40.936338],
    [-73.7467974, 40.9363326],
    [-73.726528, 40.936287],
    [-73.72383, 40.93509],
    [-73.669735, 40.843531000000006],
    [-73.66907300000001, 40.841374],
    [-73.66882550000001, 40.8059103],
    [-73.668825, 40.80478],
    [-73.668824, 40.796276000000006],
    [-73.668824, 40.786683000000004],
    [-73.668836, 40.662663],
    [-73.668851, 40.649406],
    [-73.6689638, 40.593423400000006],
    [-73.6695638, 40.5839878],
    [-74.24037440000001, 40.4983687],
    [-74.2501853, 40.497640600000004]
  ],

  footer: {
    content: [
<<<<<<< HEAD
      { label: (function () { return `© MTA/HSL, Copyright ${(1900 + new Date().getYear())}`; }()) },
=======
      { label: `© HSL, Liikennevirasto ${YEAR}` },
>>>>>>> 82aa734e9f204f5752117260948cb40556f319c8
      {},
      { name: 'footer-feedback', nameEn: 'Submit feedback', href: 'https://github.com/HSLdevcom/digitransit-ui/issues', icon: 'icon-icon_speech-bubble' },
    ],
  },

  // Default origin endpoint to use when user is outside of area
  defaultEndpoint: {
    address: 'Frumins Apartment',
    lat: 40.662663,
    lon: -73.668836,
  },
  defaultOrigins: [
    { icon: 'icon-icon_airplane', label: 'HQ', lat: 40.7045399, lon: -74.0152806 },
  ],

  aboutThisService: {
    en: [
      {
        header: 'About this service',
        paragraphs: ['The service covers public transport, walking, cycling, and some private car use. Service is built on Digitransit platform.'],
      },
      {
        header: 'Digitransit platform',
        paragraphs: ['The Digitransit service platform is an open source routing platform developed by HSL and The Finnish Transport Agency. The source code is available with the EUPL v1.2 and AGPLv3 licenses. Join us to make the service even better: digitransit.fi.'],
      },
      {
        header: 'Datasources',
        paragraphs: ["Maps, streets, buildings, stop locations etc. are provided by © OpenStreetMap contributors and downloaded from Geofabrik. Address data is retrieved from the Building and Dwelling Register of the Finnish Population Register Center and downloaded from the OpenAddresses service. Public transport routes and timetables are downloaded from Finnish Transport Agency's national public transit database."],
      },
    ],
  },

  themeMap: {
<<<<<<< HEAD
    default: 'default',
=======
    turku: 'turku',
    hsl: 'reittiopas',
    lappeenranta: 'lappeenranta',
    joensuu: 'joensuu',
    oulu: 'oulu',
    hameenlinna: 'hameenlinna',
    matka: 'matka',
    kotka: 'kotka',
    jyvaskyla: 'jyvaskyla',
    lahti: 'lahti',
    kuopio: 'kuopio',
>>>>>>> 82aa734e9f204f5752117260948cb40556f319c8
  },

  staticMessages: [],

  imperialEnabled: true,

  minutesToDepartureLimit: 9,
};
