export type RemoteKey = 'planning' | 'userApp' | 'paymentApp';

type ExposedByPlanning =
  | 'Skeleton'
  | 'TripCreationPage'
  | 'TripCreationSkeleton'
  | 'TripListPage'
  | 'TripListSkeleton'
  | 'TripDetailPage'
  | 'TripDetailSkeleton';

type ExposeByPayment = 'BillingPage' | 'AddCreditsPage';

type ExposedByUser =
  | 'ProfileLayout'
  | 'ProfileAboutPage'
  | 'ProfilePasswordPage'
  | 'ProfilePreferencesPage';

export type ExposedModules =
  | ExposedByPlanning
  | ExposeByPayment
  | ExposedByUser;
