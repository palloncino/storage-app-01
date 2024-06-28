import { Dispatch, SetStateAction } from "react";

export type Company = "sermixer" | "s2_truck_service";
// + - - - - - - - - - - - -
// | User
// + - - - - - - - - - - - -
export interface UserType {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  companyName: Company;
  email: string;
  role: string;
  password: string;
  createdAt: string; // created by the server - do not write in front end
  updatedAt: string; // created by the server - do not write in front end
}

// + - - - - - - - - - - - -
// | Client
// + - - - - - - - - - - - -
interface Address {
  street: string;
  city: string;
  zipCode: string;
  country: string;
}
export interface ClientType {
  id: number;
  fiscalCode: string;
  vatNumber: string;
  firstName: string;
  lastName: string;
  companyName: string;
  address: Address;
  email: string;
  mobileNumber?: string;
  createdAt?: string; // created by the server - do not write in front end
  updatedAt?: string; // created by the server - do not write in front end
}
// + - - - - - - - - - - - -
// | Product
// + - - - - - - - - - - - -

export interface ComponentType {
  name: string;
  price: number;
  description?: string;
  included?: boolean;
  discount?: number; // Discount as a percentage
}

export interface ProductType {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imgUrl?: string;
  components?: ComponentType[];
  company?: string;
  previewUrl?: string; // frontend only, parsed version of imgUrl (Blob => string)
  createdAt?: string; // created by the server - do not write in front end
  updatedAt?: string; // created by the server - do not write in front end
  discount?: number; // Discount as a percentage
}

export type ProductFormProps = {
  initialProduct: ProductType;
  onSave: (product: ProductType) => void;
  loading: boolean;
  errorMessage?: string;
  successMessage?: string;
};

export interface PriceSummaryProps {
  documentData: DocumentDataType;
  netDiscountOnTotal: number;
  onDiscountChange: (value: number) => void;
  taxRate?: number;
  theActor: Actor;
}

// + - - - - - - - - - - - -
// | Document
// + - - - - - - - - - - - -

export interface DocumentFooterProps {
  onSaveSignature: ({
    clientSignature,
    ownerSignature,
    signedAt,
  }: {
    clientSignature: string | null;
    ownerSignature: string | null;
    signedAt: string;
  }) => void;
  initialDate?: string;
  initialClientSignature?: string | null;
  initialOwnerSignature?: string | null;
}

export type PriceType = { [key: string]: string };

export type ComponentSelectionType = { [key: string]: boolean };

export interface SaveDocumentProps {
  hash: string;
  updatedDocumentData: DocumentDataType;
  uploadedFiles: File[];
  setMessage: (
    message: { type: "success" | "error"; text: string } | null
  ) => void;
  t: any;
  getDocument: (hash: string) => void;
}

export interface SaveDocumentProps {
  hash: string;
  updatedDocumentData: DocumentDataType;
  uploadedFiles: File[];
  setMessage: (
    message: { type: "success" | "error"; text: string } | null
  ) => void;
  t: any;
  getDocument: (hash: string) => void;
}

export type Changes = {
  name: string;
  description: string;
}[];

export type MessageObject = {
  type: "success" | "error";
  text: string;
};

export type QuoteHeadDetailsType = {
  company: string;
  description: string;
  object: string;
};

export type FollowUpSentType = {
  immediate: boolean;
  reminder: boolean;
  expiration: boolean;
};

export type DocumentHistoryType = {
  actorId: string;
  action: string;
  timestamp: string;
  details?: string;
};

export type DocumentDataDataType = {
  selectedClient: ClientType | null;
  quoteHeadDetails: QuoteHeadDetailsType | null;
  addedProducts: ProductType[] | null;
};

export type StatusName =
  | "DOCUMENT_OPENED"
  | "EMAIL_OTP"
  | "CLIENT_SIGNATURE"
  | "STORAGE_CONFIRMATION"
  | "EXPIRED"
  | "REJECTED";

export type Statuses = {
  OTP_SENT: boolean;
  CLIENT_VIEWED_DOC: boolean;
  YOUR_TURN: boolean;
  FOLLOWUP_EMAIL: boolean;
  FINALIZED: boolean;
  REJECTED: boolean;
};

export type File = {
  name: string;
  url: string;
};

export type DocumentDataType = {
  id: number;
  hash: string;
  data: DocumentDataDataType;
  createdAt: string;
  updatedAt: string;
  expiresAt: string | null;
  status: Statuses;
  signedAt: string | null;
  employeeID: string;
  clientEmail: string;
  otp: string;
  history: DocumentHistoryType[] | null;
  revisions: Revision[] | null;
  note: string | null;
};

export type HashType = { hash: string | undefined };

export type PreventiveFormProps = {
  documentData: DocumentDataType;
  setUpdatedDocumentData: (data: DocumentDataType) => void;
};

export interface ChangeLogItem {
  action: string;
  details: string;
  timestamp: string;
}

export type SaveDocumentSuccessResponse = {
  success: boolean;
  document: DocumentDataType;
};

export type Revision = {
  changes: ChangeLogItem[];
  id: number; // revision's index, if 0 is the mother revision, otherwise it s index based
  actor: Actor;
  snapshot: DocumentDataType;
  timestamp: string;
};

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export type Actor = {
  type: "employee" | "client";
  id: number;
};

export type DocumentManagementPanelProps = {
  revisions?: Revision[];
  selectedRevisionId?: number | null;
  displayChanges?: boolean;
  currentChanges?: { name: string; description: string }[];
  documentReadOnly?: boolean;
  handleSave: () => void;
  handleChosenRevision: (revisionId: number) => void;
};

export interface SharedDocumentHookType {
  message: MessageObject | null;
  setMessage: Dispatch<SetStateAction<MessageObject | null>>;
  originalDocumentData: DocumentDataType | null;
  updatedDocumentData: DocumentDataType | null;
  setUpdatedDocumentData: Dispatch<SetStateAction<DocumentDataType | null>>;
  changeLogs: ChangeLogItem[];
  lockedView: boolean;
  setLockedView: Dispatch<SetStateAction<boolean>>;
  selectedRevisionId: number | null;
  theActor: Actor | null;
  isLoadingAuthorization: boolean;
  handleSave: () => Promise<void>;
  generatePDF: () => Promise<void>;
  handleShareDocument: () => Promise<void>;
  handleRejectDocument: () => Promise<void>;
  handleChosenRevision: (revisionId: number) => void;
  getRevisionBorderColor: (actorType: string) => string;
  setNote: (note: string) => void;
  hash: string | undefined;
}
