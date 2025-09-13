export interface RelatedEvent {
  eventName: string;                // イベント名
  type: 'Party' | 'Python Event';   // 種別
  detailType: string;               // 詳細種別
  startDateTime: string;            // 開始日時
  endDateTime: string;              // 終了日時
  fee: string;                      // 費用
  participationRequirements: string; // 参加条件
  capacity: string;                 // キャパシティ
  venueJa: string;                  // 場所ja
  venueEn: string;                  // 場所en
  sponsoredByName: string;          // sponsored by name
  sponsoredByUrl: string;           // sponsored by URL
  detailsUrl: string;               // Details URL
  imageUrl: string;                 // image URL
  appendixString: string;           // Apendix String
  appendixUrl: string;              // Apendix URL
}
