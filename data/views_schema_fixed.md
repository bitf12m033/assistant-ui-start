# Views Schema (fixed)

## VW_AdminContacts
| column | type | nullable | length/precision |
|---|---|---|---|
| AdminContactID | uniqueidentifier | False | len=16 |
| AdminContactType | nvarchar | True | len=100 |
| WineryID | uniqueidentifier | True | len=16 |
| ThirdPartySupplierID | uniqueidentifier | True | len=16 |
| FirstName | nvarchar | True | len=100 |
| LastName | nvarchar | True | len=100 |
| Email | nvarchar | True | len=100 |
| Username | nvarchar | True | len=100 |
| Password | nvarchar | True | len=1000 |
| isActive | bit | True | len=1, prec=1 |
| CurrentAccessDate | datetime | True | len=8, prec=23, scale=3 |
| LastAccessDate | datetime | True | len=8, prec=23, scale=3 |
| DateAdded | datetime | True | len=8, prec=23, scale=3 |
| DateModified | datetime | True | len=8, prec=23, scale=3 |
| ModifiedBy | uniqueidentifier | True | len=16 |
| isEnableRefund | bit | True | len=1, prec=1 |
| isEnableImport | bit | True | len=1, prec=1 |
| isAllowEditCompletedOrders | bit | True | len=1, prec=1 |
| RowID | bigint | False | len=8, prec=19 |
| isAllowDeleteMembers | bit | False | len=1, prec=1 |
| isAllowSiteEditor | bit | False | len=1, prec=1 |
| isAllowEnterpriseReporting | bit | False | len=1, prec=1 |
| isAllowCCOnFile | bit | False | len=1, prec=1 |
| isAccessWebService | bit | False | len=1, prec=1 |
| isAllowOrderTypeOverride | bit | False | len=1, prec=1 |
| isShipCompliantSetup | bit | False | len=1, prec=1 |
| isAllowSalesAssociateAccess | bit | False | len=1, prec=1 |
| isDeleted | bit | False | len=1, prec=1 |
| isAllowClearCarts | bit | False | len=1, prec=1 |
| isAllowFulfillment | bit | False | len=1, prec=1 |
| isAllowMailChimp | bit | False | len=1, prec=1 |
| isLocked | bit | True | len=1, prec=1 |

## VW_CartCoupons
| column | type | nullable | length/precision |
|---|---|---|---|
| CartCouponID | uniqueidentifier | False | len=16 |
| CartID | uniqueidentifier | True | len=16 |
| WineryID | uniqueidentifier | True | len=16 |
| CouponID | uniqueidentifier | True | len=16 |
| CouponName | nvarchar | True | len=510 |
| CouponCode | nvarchar | True | len=510 |
| inUse | bit | True | len=1, prec=1 |
| CouponProductValue | numeric | True | len=9, prec=18, scale=2 |
| CouponShippingValue | numeric | True | len=9, prec=18, scale=2 |
| TotalCouponValue | numeric | True | len=9, prec=18, scale=2 |
| CouponValueOld | numeric | True | len=9, prec=18, scale=2 |
| DateAdded | datetime | True | len=8, prec=23, scale=3 |
| DateModified | datetime | True | len=8, prec=23, scale=3 |
| ModifiedBy | uniqueidentifier | True | len=16 |
| RowID | bigint | False | len=8, prec=19 |

## VW_CartItems
| column | type | nullable | length/precision |
|---|---|---|---|
| rowID | int | False | len=4, prec=10 |
| CartItemID | uniqueidentifier | False | len=16 |
| ThirdPartySupplierID | uniqueidentifier | True | len=16 |
| ThirdPartyStoreID | uniqueidentifier | True | len=16 |
| WineryID | uniqueidentifier | True | len=16 |
| CartID | uniqueidentifier | True | len=16 |
| isWine | bit | True | len=1, prec=1 |
| BottleCount | int | True | len=4, prec=10 |
| Quantity | int | True | len=4, prec=10 |
| ProductCategoryID | uniqueidentifier | True | len=16 |
| ProductTypeID | uniqueidentifier | True | len=16 |
| ProductPriceID | uniqueidentifier | True | len=16 |
| ProductID | uniqueidentifier | True | len=16 |
| ProductKeyID | uniqueidentifier | True | len=16 |
| ProductPriceKeyID | uniqueidentifier | True | len=16 |
| ProductName | nvarchar | True | len=510 |
| ProductSKU | nvarchar | True | len=510 |
| Description | ntext | True | len=16 |
| OriginalPrice | numeric | True | len=9, prec=18, scale=4 |
| Discount | numeric | True | len=9, prec=18, scale=4 |
| Price | numeric | True | len=9, prec=18, scale=4 |
| OriginalShippingPrice | numeric | True | len=9, prec=18, scale=4 |
| ShippingDiscount | numeric | True | len=9, prec=18, scale=4 |
| ShippingPrice | numeric | True | len=9, prec=18, scale=4 |
| isLowestCostShipping | bit | True | len=1, prec=1 |
| DiscountOld | numeric | True | len=9, prec=18, scale=4 |
| PriceUnits | nvarchar | True | len=510 |
| Weight | numeric | True | len=9, prec=18, scale=3 |
| WineTypeID | uniqueidentifier | True | len=16 |
| WineVintage | int | True | len=4, prec=10 |
| isCase | bit | True | len=1, prec=1 |
| WineBottleSizeID | uniqueidentifier | True | len=16 |
| WineBrandID | uniqueidentifier | True | len=16 |
| WineVarietalID | uniqueidentifier | True | len=16 |
| WineAppellationID | uniqueidentifier | True | len=16 |
| ProductReportTypeID | uniqueidentifier | True | len=16 |
| ShipperID | uniqueidentifier | True | len=16 |
| ShippingSKU | nvarchar | True | len=510 |
| DateAdded | datetime | True | len=8, prec=23, scale=3 |
| DateModified | datetime | True | len=8, prec=23, scale=3 |
| WishListQuantity | int | True | len=4, prec=10 |
| CustomizedPrice | numeric | True | len=9, prec=18, scale=4 |
| TokenID | uniqueidentifier | True | len=16 |
| KitID | uniqueidentifier | True | len=16 |
| RefundAmount | numeric | True | len=9, prec=18, scale=4 |
| RemainingAmount | numeric | True | len=9, prec=18, scale=4 |
| OriginalCartItemID | uniqueidentifier | True | len=16 |
| OverrideTotal | numeric | True | len=9, prec=18, scale=4 |
| COGS | numeric | True | len=9, prec=18, scale=4 |
| CartShippingID | uniqueidentifier | True | len=16 |
| TaxRate | numeric | True | len=5, prec=8, scale=4 |
| TaxAmount | numeric | True | len=9, prec=18, scale=4 |
| MarketplaceSKU | varchar | True | len=255 |
| MarketingFee | numeric | True | len=9, prec=18, scale=4 |
| LicenseeName | varchar | True | len=255 |
| LicenseeCity | varchar | True | len=255 |
| LicenseeState | varchar | True | len=255 |
| denominationAbbr | varchar | True | len=10 |
| InventoryLocationID | uniqueidentifier | True | len=16 |

## VW_CartPaymentTypes
| column | type | nullable | length/precision |
|---|---|---|---|
| CartPaymentTypeID | uniqueidentifier | False | len=16 |
| CartPaymentType | nvarchar | True | len=100 |
| DisplayOrder | int | True | len=4, prec=10 |
| RowID | bigint | False | len=8, prec=19 |

## VW_CartShippings
| column | type | nullable | length/precision |
|---|---|---|---|
| rowID | int | False | len=4, prec=10 |
| CartShippingID | uniqueidentifier | False | len=16 |
| inUse | bit | True | len=1, prec=1 |
| isCase | bit | True | len=1, prec=1 |
| ProductTypeID | uniqueidentifier | True | len=16 |
| ThirdPartyStoreID | uniqueidentifier | True | len=16 |
| ThirdPartySupplierID | uniqueidentifier | True | len=16 |
| WineryID | uniqueidentifier | True | len=16 |
| ShippingTypeID | uniqueidentifier | True | len=16 |
| ShippingType | nvarchar | True | len=100 |
| ShippingCode | nvarchar | True | len=100 |
| ForWhat | nvarchar | True | len=100 |
| ShippingRate | numeric | True | len=9, prec=18, scale=2 |
| WineBottleSizeID | uniqueidentifier | True | len=16 |
| Quantity | int | True | len=4, prec=10 |
| Weight | numeric | True | len=9, prec=18, scale=4 |
| CartID | uniqueidentifier | True | len=16 |
| DateAdded | datetime | True | len=8, prec=23, scale=3 |
| DateModified | datetime | True | len=8, prec=23, scale=3 |
| ModifiedBy | uniqueidentifier | True | len=16 |
| LabelPrinted | bit | True | len=1, prec=1 |

## VW_CartStatuses
| column | type | nullable | length/precision |
|---|---|---|---|
| CartStatusID | uniqueidentifier | False | len=16 |
| CartStatus | nvarchar | True | len=100 |
| Keyword | nvarchar | True | len=100 |
| DisplayOrder | int | True | len=4, prec=10 |
| RowID | bigint | False | len=8, prec=19 |
| CartStatusExtendedField | varchar | True | len=255 |

## VW_CartTracking
| column | type | nullable | length/precision |
|---|---|---|---|
| rowID | int | False | len=4, prec=10 |
| CartTrackingID | uniqueidentifier | False | len=16 |
| CartID | uniqueidentifier | True | len=16 |
| TrackingNumber | nvarchar | True | len=8000 |
| ShipDate | datetime | True | len=8, prec=23, scale=3 |
| Carrier | nvarchar | True | len=510 |
| DateAdded | datetime | True | len=8, prec=23, scale=3 |
| DateModified | datetime | True | len=8, prec=23, scale=3 |

## VW_Carts
| column | type | nullable | length/precision |
|---|---|---|---|
| rowID | int | False | len=4, prec=10 |
| CartID | uniqueidentifier | False | len=16 |
| WineryID | uniqueidentifier | True | len=16 |
| OrderNumber | int | True | len=4, prec=10 |
| MemberID | uniqueidentifier | True | len=16 |
| ShipMemberID | uniqueidentifier | True | len=16 |
| is21 | bit | True | len=1, prec=1 |
| BillBirthDate | datetime | True | len=8, prec=23, scale=3 |
| BillFirstName | nvarchar | True | len=100 |
| BillLastName | nvarchar | True | len=100 |
| BillCompany | nvarchar | True | len=510 |
| BillAddress | nvarchar | True | len=510 |
| BillAddress2 | nvarchar | True | len=510 |
| BillCity | nvarchar | True | len=100 |
| BillState | nvarchar | True | len=100 |
| BillZipCode | nvarchar | True | len=100 |
| BillPhone | nvarchar | True | len=100 |
| BillEmail | nvarchar | True | len=160 |
| ShipBirthDate | datetime | True | len=8, prec=23, scale=3 |
| ShipFirstName | nvarchar | True | len=100 |
| ShipLastName | nvarchar | True | len=100 |
| ShipCompany | nvarchar | True | len=510 |
| ShipAddress | nvarchar | True | len=510 |
| ShipAddress2 | nvarchar | True | len=510 |
| ShipCity | nvarchar | True | len=100 |
| ShipState | nvarchar | True | len=6 |
| ShipZipCode | nvarchar | True | len=100 |
| ShipPhone | nvarchar | True | len=100 |
| ShipEmail | nvarchar | True | len=160 |
| SourceCode | nvarchar | True | len=100 |
| createAccount | bit | True | len=1, prec=1 |
| isGiftMessage | bit | True | len=1, prec=1 |
| GiftMessage | text | True | len=16 |
| OrderNotes | text | True | len=16 |
| LineItems | int | True | len=4, prec=10 |
| OrderSubTotal | numeric | True | len=9, prec=18, scale=2 |
| CouponDiscount | numeric | True | len=9, prec=18, scale=2 |
| Taxes | numeric | True | len=9, prec=18, scale=2 |
| TaxableHandling | numeric | True | len=9, prec=18, scale=2 |
| Shipping | numeric | True | len=9, prec=18, scale=2 |
| OrderTotal | numeric | True | len=9, prec=18, scale=2 |
| PaymentBy | nvarchar | True | len=100 |
| CartPaymentTypeID | uniqueidentifier | True | len=16 |
| CreditCardTypeID | uniqueidentifier | True | len=16 |
| CardExpiryMo | nvarchar | True | len=100 |
| CardExpiryYr | nvarchar | True | len=100 |
| NameOnCard | nvarchar | True | len=100 |
| DateCompleted | datetime | True | len=8, prec=23, scale=3 |
| CartStatusID | uniqueidentifier | True | len=16 |
| OrderBlob | ntext | True | len=16 |
| TrackingBlob | ntext | True | len=16 |
| AffiliateID | uniqueidentifier | True | len=16 |
| Affiliate | nvarchar | True | len=510 |
| AffiliateCode | nvarchar | True | len=510 |
| AffiliateCommission | numeric | True | len=9, prec=18, scale=2 |
| CharityID | uniqueidentifier | True | len=16 |
| CharityName | nvarchar | True | len=510 |
| ElypsisFlag | bit | True | len=1, prec=1 |
| NVLAutoFlag | bit | True | len=1, prec=1 |
| WTNAutoFlag | bit | True | len=1, prec=1 |
| NVLApiFlag | bit | True | len=1, prec=1 |
| NVLAPIOrderStatusFlag | bit | True | len=1, prec=1 |
| DateAdded | datetime | True | len=8, prec=23, scale=3 |
| DateModified | datetime | True | len=8, prec=23, scale=3 |
| GiftCertificateID | uniqueidentifier | True | len=16 |
| AmountPaidByGiftCertificate | money | True | len=8, prec=19, scale=4 |
| AmountPaidByCreditCard | money | True | len=8, prec=19, scale=4 |
| GiftCertificateNo | varchar | True | len=500 |
| GiftCertificateKeyCode | varchar | True | len=500 |
| PointsProgramAccountNo | varchar | True | len=50 |
| PointsProgramPassword | varchar | True | len=50 |
| AmountPaidByPointsProgram | money | True | len=8, prec=19, scale=4 |
| isClubOrder | bit | True | len=1, prec=1 |
| DateComplianceChecked | datetime | True | len=8, prec=23, scale=3 |
| DateComplianceCommited | datetime | True | len=8, prec=23, scale=3 |
| AllocationID | uniqueidentifier | True | len=16 |
| isShipsImmediately | bit | True | len=1, prec=1 |
| isDelayProductCharge | bit | True | len=1, prec=1 |
| isDelayShippingCharge | bit | True | len=1, prec=1 |
| isRefunded | bit | True | len=1, prec=1 |
| isTaxFree | bit | True | len=1, prec=1 |
| CustomizedShippingPrice | numeric | True | len=9, prec=18, scale=2 |
| CustomizedHandlingPrice | numeric | True | len=9, prec=18, scale=2 |
| isDeposit | bit | True | len=1, prec=1 |
| DepositPercentage | numeric | True | len=9, prec=18, scale=2 |
| DepositAmount | numeric | True | len=9, prec=18, scale=2 |
| OrderPaid | numeric | True | len=9, prec=18, scale=2 |
| TransactionID | nvarchar | True | len=510 |
| ShipDate | datetime | True | len=8, prec=23, scale=3 |
| isAllowSendEmail | bit | True | len=1, prec=1 |
| isCustomOrderCheckboxChecked | bit | True | len=1, prec=1 |
| ClubBatchID | uniqueidentifier | True | len=16 |
| TransactionID2 | nvarchar | True | len=510 |
| WillCallLocationID | uniqueidentifier | True | len=16 |
| CopiedFromCartID | uniqueidentifier | True | len=16 |
| ClubMemberID | uniqueidentifier | True | len=16 |
| AddressName | nvarchar | True | len=510 |
| isAdminOrder | bit | True | len=1, prec=1 |
| isOrderGroup | bit | True | len=1, prec=1 |
| OrderGroupID | uniqueidentifier | True | len=16 |
| PaymentReference | nvarchar | True | len=510 |
| BottleDeposit | numeric | False | len=9, prec=18, scale=2 |
| ShipCompliantShipmentStatus | varchar | True | len=100 |
| ShipCompliantFulfillmentStatus | varchar | True | len=100 |
| ActualShipDate | datetime | True | len=8, prec=23, scale=3 |
| ShipCompliantStatusCheckedDate | datetime | True | len=8, prec=23, scale=3 |
| Donation | numeric | False | len=9, prec=18, scale=2 |
| CustomDonationPrice | numeric | False | len=9, prec=18, scale=2 |
| OrderName | nvarchar | True | len=100 |
| isForFriend | bit | False | len=1, prec=1 |
| FriendAmountPaid | numeric | False | len=9, prec=18, scale=2 |
| OriginalTaxes | numeric | True | len=9, prec=18, scale=2 |
| isPickedUp | bit | False | len=1, prec=1 |
| RefundOrderNumber | int | True | len=4, prec=10 |
| OriginalCartID | uniqueidentifier | True | len=16 |
| RefundedBy | nvarchar | True | len=450 |
| IsTempForRefund | bit | True | len=1, prec=1 |
| IsApplyDiscountForRefund | bit | True | len=1, prec=1 |
| BillCountryID | uniqueidentifier | True | len=16 |
| ShipCountryID | uniqueidentifier | True | len=16 |
| BillProvince | varchar | True | len=90 |
| ShipProvince | varchar | True | len=90 |
| ShippingNotes | varchar | True | len=-1 |
| OrderNumberPrefix | varchar | True | len=50 |
| AddedBy | uniqueidentifier | True | len=16 |
| IPAddress | varchar | True | len=15 |
| isReservation | bit | False | len=1, prec=1 |
| VinoVisitReservationID | uniqueidentifier | True | len=16 |
| isPOSOrder | bit | False | len=1, prec=1 |
| CashierName | nvarchar | True | len=100 |
| RegisterID | nvarchar | True | len=100 |
| LicenseRelationshipID | int | True | len=4, prec=10 |
| isMobileOrder | bit | True | len=1, prec=1 |
| SalesAssociateID | uniqueidentifier | True | len=16 |
| isTeleSalesOrder | bit | True | len=1, prec=1 |
| isMobilePOSOrder | bit | True | len=1, prec=1 |
| isFacebookOrder | bit | True | len=1, prec=1 |
| MarketingFeeTotal | numeric | True | len=9, prec=18, scale=4 |
| ToSupplierTotal | numeric | True | len=9, prec=18, scale=4 |
| AmountPaidOnAccount | numeric | True | len=9, prec=18, scale=4 |
| AmountPaidByCustomer | numeric | True | len=9, prec=18, scale=4 |
| IsMarketPlaceOrder | bit | True | len=1, prec=1 |
| isVoided | bit | True | len=1, prec=1 |
| dateCharged | datetime | True | len=8, prec=23, scale=3 |
| signature | nvarchar | True | len=-1 |
| TaxRate | decimal | True | len=5, prec=6, scale=4 |
| PosLocationName | nvarchar | True | len=100 |
| PosDeviceName | varchar | True | len=300 |
| Tip | decimal | True | len=9, prec=18, scale=2 |
| RMSSalesRepName | nvarchar | True | len=60 |
| RMSSalesRepNumber | nvarchar | True | len=20 |
| OrderType | nvarchar | True | len=100 |
| AmountPaidByGiftCard | money | True | len=8, prec=19, scale=4 |
| isProcessing | bit | True | len=1, prec=1 |
| isBusinessAddress | bit | True | len=1, prec=1 |
| shipmentStatus | varchar | True | len=100 |
| fulfillmentStatus | varchar | True | len=100 |
| DatePickedUp | datetime | True | len=8, prec=23, scale=3 |
| BatchID | uniqueidentifier | True | len=16 |
| MPOSDeviceID | int | True | len=4, prec=10 |
| isCustomizedClubOrder | bit | True | len=1, prec=1 |
| CashTendered | numeric | True | len=9, prec=18, scale=2 |
| ShipCounty | nvarchar | True | len=100 |
| EMVProvider | varchar | True | len=64 |
| tableNumber | varchar | True | len=60 |

## VW_ClubBatches
| column | type | nullable | length/precision |
|---|---|---|---|
| ClubBatchID | uniqueidentifier | False | len=16 |
| WineryID | uniqueidentifier | True | len=16 |
| BatchNumber | int | True | len=4, prec=10 |
| ClubLevelID | uniqueidentifier | True | len=16 |
| TargetShipDate | datetime | True | len=8, prec=23, scale=3 |
| Rate | money | True | len=8, prec=19, scale=4 |
| NumberOfBottles | int | True | len=4, prec=10 |
| WineShipperID | uniqueidentifier | True | len=16 |
| isExportCreditCardList | bit | True | len=1, prec=1 |
| MemberSearchDate | datetime | True | len=8, prec=23, scale=3 |
| WineShippingTypeID | uniqueidentifier | True | len=16 |
| isShipmentInfo | bit | True | len=1, prec=1 |
| WineBottleSizeID | uniqueidentifier | True | len=16 |
| isWineInfo | bit | True | len=1, prec=1 |
| isBillingStarted | bit | True | len=1, prec=1 |
| isClosed | bit | True | len=1, prec=1 |
| DateAdded | datetime | True | len=8, prec=23, scale=3 |
| DateModified | datetime | True | len=8, prec=23, scale=3 |
| ModifiedBy | uniqueidentifier | True | len=16 |
| CollateralSKUs | varchar | True | len=100 |
| isProcessingStarted | bit | True | len=1, prec=1 |
| isProcessingStopped | bit | True | len=1, prec=1 |
| ProcessingStartTime | datetime | True | len=8, prec=23, scale=3 |
| ProcessingEndTime | datetime | True | len=8, prec=23, scale=3 |
| ProcessingNumberOfRecords | int | True | len=4, prec=10 |
| ProcessingNumberOfRecordsCompleted | int | True | len=4, prec=10 |
| isUseOldProcessingLogic | bit | False | len=1, prec=1 |
| isCreatedOrders | bit | True | len=1, prec=1 |
| BatchName | nvarchar | True | len=510 |
| CutOffDate | datetime | True | len=8, prec=23, scale=3 |
| LastShipDate | datetime | True | len=8, prec=23, scale=3 |
| isCreatingStarted | bit | True | len=1, prec=1 |
| isCreatingStopped | bit | True | len=1, prec=1 |
| CreatingStartTime | datetime | True | len=8, prec=23, scale=3 |
| CreatingEndTime | datetime | True | len=8, prec=23, scale=3 |
| CreatingNumberOfRecords | int | True | len=4, prec=10 |
| CreatingNumberOfRecordsCompleted | int | True | len=4, prec=10 |
| RowID | bigint | False | len=8, prec=19 |
| isTemplate | bit | True | len=1, prec=1 |
| FutureShipDate | datetime | True | len=8, prec=23, scale=3 |
| isShipImmediately | bit | True | len=1, prec=1 |
| CustomizeStartDate | datetime | True | len=8, prec=23, scale=3 |
| CustomizeEndDate | datetime | True | len=8, prec=23, scale=3 |

## VW_ClubLevels
| column | type | nullable | length/precision |
|---|---|---|---|
| ClubLevelID | uniqueidentifier | False | len=16 |
| WineryID | uniqueidentifier | True | len=16 |
| Title | nvarchar | True | len=510 |
| Description | ntext | True | len=16 |
| Rate | money | True | len=8, prec=19, scale=4 |
| NumberOfBottles | int | True | len=4, prec=10 |
| DisplayOrder | int | True | len=4, prec=10 |
| isActive | bit | True | len=1, prec=1 |
| MetaTagTitle | nvarchar | True | len=510 |
| MetaTagKeywords | ntext | True | len=16 |
| MetaTagDescription | ntext | True | len=16 |
| LastShipmentDate | datetime | True | len=8, prec=23, scale=3 |
| DateAdded | datetime | True | len=8, prec=23, scale=3 |
| DateModified | datetime | True | len=8, prec=23, scale=3 |
| ModifiedBy | uniqueidentifier | True | len=16 |
| isNeedNotification | bit | True | len=1, prec=1 |
| DaysBeforeNotification | int | True | len=4, prec=10 |
| RowID | bigint | False | len=8, prec=19 |
| DisplayName | varchar | True | len=30 |
| onSignUpRedirectDestinationProductCategoryID | uniqueidentifier | True | len=16 |
| onLoginRedirectDestinationProductCategoryID | uniqueidentifier | True | len=16 |
| ClubTypeID | uniqueidentifier | False | len=16 |
| EmailContent | ntext | True | len=16 |
| SubscriptionSettingsID | uniqueidentifier | True | len=16 |
| FlexPayProductCategoryID | uniqueidentifier | True | len=16 |

## VW_ClubMembers
| column | type | nullable | length/precision |
|---|---|---|---|
| rowID | int | False | len=4, prec=10 |
| ClubMemberID | uniqueidentifier | False | len=16 |
| AltClubMemberID | nvarchar | True | len=100 |
| WineryID | uniqueidentifier | True | len=16 |
| MemberID | uniqueidentifier | True | len=16 |
| ShipMemberID | uniqueidentifier | True | len=16 |
| AltShipMemberID | nvarchar | True | len=100 |
| ClubLevelID | uniqueidentifier | True | len=16 |
| ClubFrequencyID | uniqueidentifier | True | len=16 |
| Months | int | True | len=4, prec=10 |
| Weeks | int | True | len=4, prec=10 |
| LastBillDate | datetime | True | len=8, prec=23, scale=3 |
| LastBatchNumber | int | True | len=4, prec=10 |
| LastPaymentStatus | nvarchar | True | len=100 |
| NextBillDate | datetime | True | len=8, prec=23, scale=3 |
| Rate | money | True | len=8, prec=19, scale=4 |
| NumberOfBottles | int | True | len=4, prec=10 |
| TotalNumberOfShipments | int | True | len=4, prec=10 |
| CurrentNumberOfShipments | int | True | len=4, prec=10 |
| ShipBirthDate | datetime | True | len=8, prec=23, scale=3 |
| ShipFirstName | nvarchar | True | len=100 |
| ShipLastName | nvarchar | True | len=100 |
| ShipCompany | nvarchar | True | len=510 |
| ShipAddress | nvarchar | True | len=510 |
| ShipAddress2 | nvarchar | True | len=100 |
| ShipCity | nvarchar | True | len=100 |
| ShipState | nvarchar | True | len=100 |
| ShipZipCode | nvarchar | True | len=100 |
| ShipPhone | nvarchar | True | len=100 |
| ShipEmail | nvarchar | True | len=160 |
| SourceCode | nvarchar | True | len=100 |
| isGiftMessage | bit | True | len=1, prec=1 |
| GiftMessage | ntext | True | len=16 |
| isActive | bit | True | len=1, prec=1 |
| EndDate | datetime | True | len=8, prec=23, scale=3 |
| AffiliateID | uniqueidentifier | True | len=16 |
| Affiliate | nvarchar | True | len=510 |
| AffiliateCommission | numeric | True | len=9, prec=18, scale=2 |
| ClubBlob | ntext | True | len=16 |
| DateAdded | datetime | True | len=8, prec=23, scale=3 |
| DateModified | datetime | True | len=8, prec=23, scale=3 |
| isOnHold | bit | True | len=1, prec=1 |
| OnHoldDate | datetime | True | len=8, prec=23, scale=3 |
| WineShippingTypeID | uniqueidentifier | True | len=16 |
| ShipSalutation | nvarchar | True | len=20 |
| ShipPhone2 | nvarchar | True | len=100 |
| BillCountryID | uniqueidentifier | True | len=16 |
| ShipCountryID | uniqueidentifier | True | len=16 |
| BillProvince | varchar | True | len=90 |
| ShipProvince | varchar | True | len=90 |
| isSupplemental | bit | False | len=1, prec=1 |
| ModifiedByme | datetime | True | len=8, prec=23, scale=3 |
| DateImported | datetime | True | len=8, prec=23, scale=3 |
| CancelDate | datetime | True | len=8, prec=23, scale=3 |
| SalesAssociateID | uniqueidentifier | True | len=16 |
| StartDate | datetime | True | len=8, prec=23, scale=3 |
| HoldStartDate | datetime | True | len=8, prec=23, scale=3 |
| CancelReasonID | int | True | len=4, prec=10 |
| HoldReasonID | int | True | len=4, prec=10 |
| ShipAddressName | varchar | True | len=50 |
| ClubSignupLocationID | uniqueidentifier | True | len=16 |

## VW_ClubReasons
| column | type | nullable | length/precision |
|---|---|---|---|
| id | int | False | len=4, prec=10 |
| WineryID | uniqueidentifier | False | len=16 |
| reason | varchar | False | len=255 |
| type | varchar | False | len=50 |

## VW_CreditCardTypes
| column | type | nullable | length/precision |
|---|---|---|---|
| CreditCardTypeID | uniqueidentifier | False | len=16 |
| CreditCardType | nvarchar | True | len=100 |
| CreditCardTypeShort | nvarchar | True | len=100 |
| CreditCardTypeNS | nvarchar | True | len=100 |
| DisplayOrder | int | True | len=4, prec=10 |
| RowID | bigint | False | len=8, prec=19 |

## VW_GetWineryIDs
| column | type | nullable | length/precision |
|---|---|---|---|
| WineryID | uniqueidentifier | False | len=16 |

## VW_InventoryByLocation
| column | type | nullable | length/precision |
|---|---|---|---|
| InventoryByLocationID | uniqueidentifier | False | len=16 |
| ProductID | uniqueidentifier | False | len=16 |
| InventoryLocationID | uniqueidentifier | False | len=16 |
| WineryID | uniqueidentifier | False | len=16 |
| Count | int | True | len=4, prec=10 |
| Allocated | int | True | len=4, prec=10 |
| OutOfStockOptionID | uniqueidentifier | True | len=16 |
| OutOfStockMessage | nvarchar | True | len=1000 |
| DisplayQuantityLeftAt | int | True | len=4, prec=10 |
| EmailNotificationAt | int | True | len=4, prec=10 |
| OutOfStockAt | int | True | len=4, prec=10 |
| isEmailAlertSent | bit | False | len=1, prec=1 |
| isIgnoreEmailAlert | bit | False | len=1, prec=1 |
| EmailTo | nvarchar | True | len=510 |
| DateAdded | datetime | True | len=8, prec=23, scale=3 |
| DateModified | datetime | True | len=8, prec=23, scale=3 |
| ModifiedBy | uniqueidentifier | True | len=16 |

## VW_InventoryLocationTransactions
| column | type | nullable | length/precision |
|---|---|---|---|
| InventoryLocationTransactionID | uniqueidentifier | False | len=16 |
| ProductID | uniqueidentifier | False | len=16 |
| InventoryLocationID | uniqueidentifier | False | len=16 |
| WineryID | uniqueidentifier | False | len=16 |
| CartID | uniqueidentifier | True | len=16 |
| TransferFrom | uniqueidentifier | True | len=16 |
| TransferTo | uniqueidentifier | True | len=16 |
| Description | nvarchar | True | len=510 |
| Notes | ntext | True | len=16 |
| Count | int | True | len=4, prec=10 |
| DateAdded | datetime | True | len=8, prec=23, scale=3 |
| DateModified | datetime | True | len=8, prec=23, scale=3 |
| ModifiedBy | uniqueidentifier | True | len=16 |

## VW_InventoryLocations
| column | type | nullable | length/precision |
|---|---|---|---|
| InventoryLocationID | uniqueidentifier | False | len=16 |
| LocationName | varchar | True | len=100 |
| IsBonded | bit | False | len=1, prec=1 |
| IsDefault | bit | False | len=1, prec=1 |
| WineryID | uniqueidentifier | False | len=16 |
| DateAdded | datetime | True | len=8, prec=23, scale=3 |
| DateModified | datetime | True | len=8, prec=23, scale=3 |
| IsAllocationDefault | bit | False | len=1, prec=1 |
| IsActive | bit | False | len=1, prec=1 |

## VW_MemberNotes
| column | type | nullable | length/precision |
|---|---|---|---|
| RowID | int | False | len=4, prec=10 |
| MemberNotesID | uniqueidentifier | False | len=16 |
| MemberID | uniqueidentifier | False | len=16 |
| DateAdded | datetime | True | len=8, prec=23, scale=3 |
| DateModified | datetime | True | len=8, prec=23, scale=3 |
| ModifiedBy | uniqueidentifier | True | len=16 |
| Notes | nvarchar | True | len=8000 |

## VW_MemberTypes
| column | type | nullable | length/precision |
|---|---|---|---|
| MemberTypeID | uniqueidentifier | False | len=16 |
| WineryID | uniqueidentifier | True | len=16 |
| MemberType | nvarchar | True | len=100 |
| isDeletable | bit | True | len=1, prec=1 |
| Keyword | nvarchar | True | len=100 |
| DateAdded | datetime | True | len=8, prec=23, scale=3 |
| DateModified | datetime | True | len=8, prec=23, scale=3 |
| ModifiedBy | uniqueidentifier | True | len=16 |
| pbmListID | uniqueidentifier | True | len=16 |
| RowID | bigint | False | len=8, prec=19 |

## VW_Members
| column | type | nullable | length/precision |
|---|---|---|---|
| rowID | int | False | len=4, prec=10 |
| MemberID | uniqueidentifier | False | len=16 |
| WineryID | uniqueidentifier | True | len=16 |
| AltMemberID | nvarchar | True | len=100 |
| AltAccountNumber | nvarchar | True | len=100 |
| BirthDate | datetime | True | len=8, prec=23, scale=3 |
| FirstName | nvarchar | True | len=100 |
| LastName | nvarchar | True | len=100 |
| Company | nvarchar | True | len=510 |
| Address | nvarchar | True | len=510 |
| Address2 | nvarchar | True | len=510 |
| City | nvarchar | True | len=100 |
| State | nvarchar | True | len=100 |
| ZipCode | nvarchar | True | len=100 |
| Phone | nvarchar | True | len=100 |
| Email | nvarchar | True | len=160 |
| Username | nvarchar | True | len=100 |
| Password | nvarchar | True | len=1000 |
| SourceCode | nvarchar | True | len=100 |
| CharityID | uniqueidentifier | True | len=16 |
| CreditCardTypeID | uniqueidentifier | True | len=16 |
| CreditCardExpMo | int | True | len=4, prec=10 |
| CreditCardExpYr | int | True | len=4, prec=10 |
| NameOnCard | nvarchar | True | len=100 |
| PBMCompletedDate | datetime | True | len=8, prec=23, scale=3 |
| CurrentAccessDate | datetime | True | len=8, prec=23, scale=3 |
| LastAccessDate | datetime | True | len=8, prec=23, scale=3 |
| DateAdded | datetime | True | len=8, prec=23, scale=3 |
| DateModified | datetime | True | len=8, prec=23, scale=3 |
| DateImported | datetime | True | len=8, prec=23, scale=3 |
| DateExported | datetime | True | len=8, prec=23, scale=3 |
| ModifiedBy | uniqueidentifier | True | len=16 |
| CopiedFromMemberID | uniqueidentifier | True | len=16 |
| Salutation | nvarchar | True | len=20 |
| Phone2 | nvarchar | True | len=100 |
| MemberNumber | int | True | len=4, prec=10 |
| CountryID | uniqueidentifier | True | len=16 |
| Province | varchar | True | len=90 |
| CardAlias | varchar | True | len=50 |
| auth_net_customerID | varchar | True | len=50 |
| isConfirmed | bit | True | len=1, prec=1 |
| isLocked | bit | True | len=1, prec=1 |
| IsProtected | bit | True | len=1, prec=1 |

## VW_MembersXMemberTypes
| column | type | nullable | length/precision |
|---|---|---|---|
| MembersXMemberTypesID | uniqueidentifier | False | len=16 |
| MemberID | uniqueidentifier | True | len=16 |
| MemberTypeID | uniqueidentifier | True | len=16 |
| ModifiedBy | uniqueidentifier | True | len=16 |
| DateAdded | datetime | True | len=8, prec=23, scale=3 |
| RowID | bigint | False | len=8, prec=19 |

## VW_OrderNotes
| column | type | nullable | length/precision |
|---|---|---|---|
| OrderNotesID | uniqueidentifier | False | len=16 |
| CartID | uniqueidentifier | False | len=16 |
| DateAdded | datetime | True | len=8, prec=23, scale=3 |
| DateModified | datetime | True | len=8, prec=23, scale=3 |
| ModifiedBy | uniqueidentifier | True | len=16 |
| Notes | nvarchar | True | len=2048 |
| RowID | bigint | False | len=8, prec=19 |

## VW_OrderRefund
| column | type | nullable | length/precision |
|---|---|---|---|
| OrderRefundID | uniqueidentifier | False | len=16 |
| CartID | uniqueidentifier | False | len=16 |
| DateAdded | datetime | True | len=8, prec=23, scale=3 |
| DateModified | datetime | True | len=8, prec=23, scale=3 |
| ModifiedBy | uniqueidentifier | True | len=16 |
| Reason | nvarchar | True | len=2048 |
| Amount | numeric | True | len=9, prec=18, scale=2 |
| RowID | bigint | False | len=8, prec=19 |

## VW_ProductTypes
| column | type | nullable | length/precision |
|---|---|---|---|
| ProductTypeID | uniqueidentifier | False | len=16 |
| ProductType | nvarchar | True | len=100 |
| DisplayOrder | int | True | len=4, prec=10 |
| RowID | bigint | False | len=8, prec=19 |

## VW_Products
| column | type | nullable | length/precision |
|---|---|---|---|
| rowID | int | False | len=4, prec=10 |
| ProductID | uniqueidentifier | False | len=16 |
| WineryID | uniqueidentifier | True | len=16 |
| ProductTypeID | uniqueidentifier | True | len=16 |
| ProductKeyID | uniqueidentifier | True | len=16 |
| PhotoPath | nvarchar | True | len=510 |
| Picture | nvarchar | True | len=510 |
| ProductName | nvarchar | True | len=510 |
| ProductSKU | nvarchar | True | len=510 |
| Price1 | money | True | len=8, prec=19, scale=4 |
| PriceUnit1 | nvarchar | True | len=510 |
| SalePrice1 | money | True | len=8, prec=19, scale=4 |
| Price2 | money | True | len=8, prec=19, scale=4 |
| PriceUnit2 | nvarchar | True | len=510 |
| SalePrice2 | money | True | len=8, prec=19, scale=4 |
| WinePricePerBottle | money | True | len=8, prec=19, scale=4 |
| WinePricePerCase | money | True | len=8, prec=19, scale=4 |
| WineSalePricePerBottle | money | True | len=8, prec=19, scale=4 |
| WineSalePricePerCase | money | True | len=8, prec=19, scale=4 |
| isActive | bit | True | len=1, prec=1 |
| isActiveBySupplier | bit | True | len=1, prec=1 |
| isWineStartPage | bit | True | len=1, prec=1 |
| Teaser | ntext | True | len=16 |
| MemberTeaser | ntext | True | len=16 |
| NonMemberTeaser | ntext | True | len=16 |
| MetaTagTitle | nvarchar | True | len=510 |
| MetaTagKeywords | ntext | True | len=16 |
| MetaTagDescription | ntext | True | len=16 |
| Description | ntext | True | len=16 |
| DateAdded | datetime | True | len=8, prec=23, scale=3 |
| DateModified | datetime | True | len=8, prec=23, scale=3 |
| ModifiedBy | uniqueidentifier | True | len=16 |
| isTaxable | bit | False | len=1, prec=1 |
| isShownOnAddOrder | bit | True | len=1, prec=1 |
| MarketingURL | nvarchar | True | len=510 |
| OverrideCompliance | bit | False | len=1, prec=1 |
| isFavorite | bit | False | len=1, prec=1 |
| BrandID | uniqueidentifier | True | len=16 |
| isForExport | bit | False | len=1, prec=1 |
| facebookTeaser | nvarchar | True | len=-1 |
| isWebserviceEnabled | bit | False | len=1, prec=1 |
| cogs | numeric | True | len=9, prec=18, scale=4 |
| MarketplaceSKU | varchar | True | len=255 |
| MarketingFee | numeric | True | len=9, prec=18, scale=4 |
| ShortName | varchar | True | len=30 |
| PlainName | varchar | True | len=255 |
| CostPerBottle | numeric | True | len=9, prec=18, scale=4 |
| CostPerCase | numeric | True | len=9, prec=18, scale=4 |
| COGS2 | numeric | True | len=9, prec=18, scale=4 |
| COGS1 | numeric | True | len=9, prec=18, scale=4 |
| ReportGroupID | uniqueidentifier | True | len=16 |
| KitBottleSizeID | uniqueidentifier | True | len=16 |
| productWeight | numeric | True | len=9, prec=18, scale=2 |
| denominationID | int | True | len=4, prec=10 |
| isPromoExcluded | bit | False | len=1, prec=1 |
| isComplianceExcluded | bit | False | len=1, prec=1 |
| MinPerOrder | tinyint | True | len=1, prec=3 |
| MaxPerOrder | tinyint | True | len=1, prec=3 |
| isDataFeedWatchEnabled | bit | False | len=1, prec=1 |
| isExcludedFromCategoryTax | bit | True | len=1, prec=1 |
| isPhysicalInventoryExcluded | bit | False | len=1, prec=1 |
| isTaxIncluded | bit | True | len=1, prec=1 |
| PrinterGroupID | uniqueidentifier | True | len=16 |

## VW_ProductsXKits
| column | type | nullable | length/precision |
|---|---|---|---|
| ProductsXKitsID | uniqueidentifier | False | len=16 |
| KitID | uniqueidentifier | False | len=16 |
| ProductID | uniqueidentifier | False | len=16 |
| Quantity | int | False | len=4, prec=10 |
| RealPrice | decimal | True | len=9, prec=18, scale=2 |
| PriceID | uniqueidentifier | True | len=16 |
| ProductTypeID | uniqueidentifier | False | len=16 |
| RowID | bigint | False | len=8, prec=19 |
| inventoryPriceID | uniqueidentifier | True | len=16 |

## VW_ReportGroups
| column | type | nullable | length/precision |
|---|---|---|---|
| RowID | int | False | len=4, prec=10 |
| ReportGroupID | uniqueidentifier | False | len=16 |
| WineryID | uniqueidentifier | False | len=16 |
| ReportGroup | varchar | False | len=255 |
| DateAdded | datetime | False | len=8, prec=23, scale=3 |
| DateModified | datetime | True | len=8, prec=23, scale=3 |
| ModifiedBy | uniqueidentifier | True | len=16 |

## VW_SalesAssociates
| column | type | nullable | length/precision |
|---|---|---|---|
| rowID | int | False | len=4, prec=10 |
| SalesAssociateID | uniqueidentifier | False | len=16 |
| WineryID | uniqueidentifier | False | len=16 |
| FirstName | nvarchar | False | len=100 |
| LastName | nvarchar | True | len=100 |
| pin | varchar | True | len=4 |
| canOverrideSC | bit | False | len=1, prec=1 |
| canVoidOrders | bit | False | len=1, prec=1 |
| canEditMembers | bit | False | len=1, prec=1 |
| canCustomizeProductPrice | bit | False | len=1, prec=1 |
| canQuickDiscount | bit | False | len=1, prec=1 |
| isActive | bit | True | len=1, prec=1 |
| canOpenClose | bit | False | len=1, prec=1 |
| canCaptureAuthorizedOrders | bit | False | len=1, prec=1 |
| canWaiveTaxes | bit | False | len=1, prec=1 |
| canOverrideFiredTicket | bit | False | len=1, prec=1 |

## VW_WillCallLocations
| column | type | nullable | length/precision |
|---|---|---|---|
| WillCallLocationID | uniqueidentifier | False | len=16 |
| WineryID | uniqueidentifier | False | len=16 |
| Company | nvarchar | True | len=100 |
| Address | nvarchar | True | len=100 |
| Address2 | nvarchar | True | len=100 |
| City | nvarchar | True | len=100 |
| State | nvarchar | True | len=100 |
| ZipCode | nvarchar | True | len=100 |
| Rate | numeric | True | len=9, prec=18, scale=2 |
| Phone | nvarchar | True | len=100 |
| ShippingTypeID | uniqueidentifier | True | len=16 |
| isThirdPartyShipper | bit | False | len=1, prec=1 |
| WillCallOptionID | uniqueidentifier | False | len=16 |
| Email | varchar | True | len=90 |
| Website | varchar | True | len=-1 |
| WineShipperID | uniqueidentifier | True | len=16 |
| LicenseRelationshipID | int | True | len=4, prec=10 |
| RowID | bigint | False | len=8, prec=19 |

## VW_WineAppellations
| column | type | nullable | length/precision |
|---|---|---|---|
| WineAppellationID | uniqueidentifier | False | len=16 |
| WineryID | uniqueidentifier | True | len=16 |
| WineAppellation | nvarchar | True | len=100 |
| DateAdded | datetime | True | len=8, prec=23, scale=3 |
| DateModified | datetime | True | len=8, prec=23, scale=3 |
| ModifiedBy | uniqueidentifier | True | len=16 |
| WineRegionID | uniqueidentifier | True | len=16 |
| RowID | bigint | False | len=8, prec=19 |

## VW_WineBottleSizes
| column | type | nullable | length/precision |
|---|---|---|---|
| WineBottleSizeID | uniqueidentifier | False | len=16 |
| WineBottleSize | nvarchar | True | len=100 |
| DisplayOrder | int | True | len=4, prec=10 |
| Volume | decimal | True | len=5, prec=5, scale=3 |
| RowID | bigint | False | len=8, prec=19 |
| NumberOfBottles | int | True | len=4, prec=10 |

## VW_WineBrands
| column | type | nullable | length/precision |
|---|---|---|---|
| rowID | int | False | len=4, prec=10 |
| WineBrandID | uniqueidentifier | False | len=16 |
| WineryID | uniqueidentifier | True | len=16 |
| WineBrand | nvarchar | True | len=510 |
| WineMaker | ntext | True | len=16 |
| WineCharacteristics | ntext | True | len=16 |
| Description | ntext | True | len=16 |
| DateAdded | datetime | True | len=8, prec=23, scale=3 |
| DateModified | datetime | True | len=8, prec=23, scale=3 |
| ModifiedBy | uniqueidentifier | True | len=16 |
| WineBrandKey | varchar | True | len=50 |

## VW_WineShippingTypes
| column | type | nullable | length/precision |
|---|---|---|---|
| WineShippingTypeID | uniqueidentifier | False | len=16 |
| WineryID | uniqueidentifier | True | len=16 |
| ShippingType | nvarchar | True | len=100 |
| ShippingCode | nvarchar | True | len=100 |
| ShipTime | nvarchar | True | len=100 |
| isClubOnly | bit | True | len=1, prec=1 |
| isLowestCostShipping | bit | True | len=1, prec=1 |
| DisplayOrder | int | True | len=4, prec=10 |
| ModifiedBy | uniqueidentifier | True | len=16 |
| DateAdded | datetime | True | len=8, prec=23, scale=3 |
| DateModified | datetime | True | len=8, prec=23, scale=3 |
| isWillCall | bit | True | len=1, prec=1 |
| isAllocationOnly | bit | True | len=1, prec=1 |
| isDisplayOnClubSignup | bit | False | len=1, prec=1 |
| RowID | bigint | False | len=8, prec=19 |
| isActive | bit | False | len=1, prec=1 |
| isPosOnly | bit | False | len=1, prec=1 |
| ShipCompliantTag | varchar | True | len=50 |
| isHiddenForStore | bit | False | len=1, prec=1 |
| InventoryLocationID | uniqueidentifier | True | len=16 |

## VW_WineTypes
| column | type | nullable | length/precision |
|---|---|---|---|
| WineTypeID | uniqueidentifier | False | len=16 |
| WineType | nvarchar | True | len=100 |
| DisplayOrder | int | True | len=4, prec=10 |
| RowID | bigint | False | len=8, prec=19 |

## VW_WineVarietals
| column | type | nullable | length/precision |
|---|---|---|---|
| WineVarietalID | uniqueidentifier | False | len=16 |
| WineryID | uniqueidentifier | True | len=16 |
| WineVarietal | nvarchar | True | len=100 |
| DateAdded | datetime | True | len=8, prec=23, scale=3 |
| DateModified | datetime | True | len=8, prec=23, scale=3 |
| ModifiedBy | uniqueidentifier | True | len=16 |
| WineTypeID | uniqueidentifier | True | len=16 |
| RowID | bigint | False | len=8, prec=19 |

## VW_Wineries
| column | type | nullable | length/precision |
|---|---|---|---|
| WineryID | uniqueidentifier | False | len=16 |
| WineryName | nvarchar | True | len=100 |
| AbbreviatedName | nvarchar | True | len=10 |
| Address | nvarchar | True | len=510 |
| City | nvarchar | True | len=100 |
| State | nvarchar | True | len=6 |
| ZipCode | nvarchar | True | len=100 |
| Phone | nvarchar | True | len=100 |
| CountryCode | nvarchar | True | len=6 |
| HttpPath | nvarchar | True | len=200 |
| IPAddress | varchar | True | len=50 |
| isSSL | bit | True | len=1, prec=1 |
| Directory | nvarchar | True | len=100 |
| HomepageID | uniqueidentifier | True | len=16 |
| ProductCategoryID | uniqueidentifier | True | len=16 |
| EmailHeader | nvarchar | True | len=100 |
| EmailFooter | nvarchar | True | len=100 |
| PrimaryEmail | nvarchar | True | len=510 |
| StatsPath | nvarchar | True | len=510 |
| StatsPackage | nvarchar | True | len=100 |
| StatsUsername | nvarchar | True | len=100 |
| StatsPassword | nvarchar | True | len=100 |
| isAutoSendToNVL | bit | True | len=1, prec=1 |
| isAutoSendToWTN | bit | True | len=1, prec=1 |
| isAutoSendToNVLViaAPI | bit | True | len=1, prec=1 |
| AutoOrderNumber | int | True | len=4, prec=10 |
| isActive | bit | True | len=1, prec=1 |
| isFirstPartyWine | bit | True | len=1, prec=1 |
| hasAffiliates | bit | False | len=1, prec=1 |
| hasCharities | bit | True | len=1, prec=1 |
| isSendWineOrderToShipper | bit | True | len=1, prec=1 |
| hasWineSearch | bit | True | len=1, prec=1 |
| WineSearchUses | uniqueidentifier | True | len=16 |
| InventoryEmail | nvarchar | True | len=510 |
| InventoryTimeOut | numeric | True | len=9, prec=18, scale=2 |
| OutOfStockOptionID | uniqueidentifier | True | len=16 |
| OutOfStockMessage | nvarchar | True | len=510 |
| ElypsisUsername | nvarchar | True | len=100 |
| ElypsisPassword | nvarchar | True | len=100 |
| ElypsisCustomerRetrievalDate | datetime | True | len=8, prec=23, scale=3 |
| DisplayQuantityLeftAt | int | True | len=4, prec=10 |
| EmailNotificationAt | int | True | len=4, prec=10 |
| DatePBMUpdated | datetime | True | len=8, prec=23, scale=3 |
| allowClubDeactivation | bit | True | len=1, prec=1 |
| DateAdded | datetime | True | len=8, prec=23, scale=3 |
| DateModified | datetime | True | len=8, prec=23, scale=3 |
| ModifiedBy | uniqueidentifier | True | len=16 |
| isManageCSS | bit | True | len=1, prec=1 |
| CSSName | varchar | True | len=50 |
| isShipCompliantEnabled | bit | False | len=1, prec=1 |
| ShipCompliantUserName | varchar | True | len=50 |
| ShipCompliantPassword | varchar | True | len=50 |
| ShipCompliantTag | varchar | True | len=200 |
| isShipCompliantForFulfillment | bit | True | len=1, prec=1 |
| isStopNonCompliantOrders | bit | True | len=1, prec=1 |
| isQuarantineNonCompliantOrders | bit | True | len=1, prec=1 |
| ShipCompliantOrderPrefix | varchar | True | len=50 |
| ShipCompliantURL | varchar | True | len=100 |
| isAllowAllocation | bit | True | len=1, prec=1 |
| isKiosk | bit | True | len=1, prec=1 |
| isAllowAcceptOrder | bit | True | len=1, prec=1 |
| isAllowAddOrder | bit | True | len=1, prec=1 |
| isAllowSelectProducts | bit | True | len=1, prec=1 |
| isAllowEditOrder | bit | True | len=1, prec=1 |
| isAllowEditMember | bit | True | len=1, prec=1 |
| isAllowEditNotes | bit | True | len=1, prec=1 |
| isAllowRefundOrder | bit | True | len=1, prec=1 |
| isAllowCopyOrder | bit | True | len=1, prec=1 |
| isAllowSplitOrder | bit | True | len=1, prec=1 |
| isAllowCancelOrder | bit | True | len=1, prec=1 |
| isCustomOrderCheckboxEnabled | bit | True | len=1, prec=1 |
| CustomOrderCheckboxName | nvarchar | True | len=200 |
| isAllowWinePricing | bit | True | len=1, prec=1 |
| isRefundDemo | bit | True | len=1, prec=1 |
| isAllowImages | bit | True | len=1, prec=1 |
| ShipCompliantFulfillmentAccount | varchar | True | len=50 |
| isShipCompliantTaxServiceEnabled | bit | True | len=1, prec=1 |
| isShipCompliantAddressValidationEnabled | bit | True | len=1, prec=1 |
| isShipCompliantAgeVerificationEnabled | bit | True | len=1, prec=1 |
| OutOfStockAt | int | True | len=4, prec=10 |
| ThirdPartyShipper | uniqueidentifier | True | len=16 |
| pool | int | True | len=4, prec=10 |
| googleUA | nvarchar | True | len=60 |
| hasStoreFilter | bit | True | len=1, prec=1 |
| isLockedSite | bit | True | len=1, prec=1 |
| hasDOBAuthentication | bit | True | len=1, prec=1 |
| isUseThirdPartyShipperForProducts | bit | True | len=1, prec=1 |
| isAllowGroupOrders | bit | False | len=1, prec=1 |
| isAllowMultipleAddresses | bit | False | len=1, prec=1 |
| isAllowUploadOrderLists | bit | False | len=1, prec=1 |
| isAllowEditCompletedOrders | bit | False | len=1, prec=1 |
| TabChoice | int | False | len=4, prec=10 |
| IsSelectedTabs | bit | False | len=1, prec=1 |
| IsCreatedTabs | bit | False | len=1, prec=1 |
| hasDonations | bit | False | len=1, prec=1 |
| isFriendOrderManagementEnabled | bit | False | len=1, prec=1 |
| CustomDownloadWineNotes | nvarchar | True | len=200 |
| isSortEnabled | bit | False | len=1, prec=1 |
| isStatePopupBeforeAddToCart | bit | False | len=1, prec=1 |
| hasInvite | bit | False | len=1, prec=1 |
| hasInviteImport | bit | False | len=1, prec=1 |
| isAllowClubMemberShippingTypes | bit | False | len=1, prec=1 |
| RequireBottleMultiplesOf | int | True | len=4, prec=10 |
| isAllowFutureShipDate | bit | False | len=1, prec=1 |
| RefundType | int | True | len=4, prec=10 |
| hasBlog | bit | True | len=1, prec=1 |
| isMultipleCurrencies | bit | True | len=1, prec=1 |
| defaultCurrencyID | uniqueidentifier | True | len=16 |
| isAllowCreditCardImport | bit | False | len=1, prec=1 |
| CreditCardExportFormat | varchar | False | len=5 |
| isClearSessionOnCheckout | bit | False | len=1, prec=1 |
| isQuickInfo | bit | False | len=1, prec=1 |
| isValutecPINRequired | bit | False | len=1, prec=1 |
| isValutecEnabled | bit | False | len=1, prec=1 |
| ValutecTerminalID | varchar | True | len=20 |
| isManagePods | bit | False | len=1, prec=1 |
| IsDrilldowns | bit | False | len=1, prec=1 |
| isAllowCreditCardOnFile | bit | True | len=1, prec=1 |
| isUseCreditCardOnFile | bit | True | len=1, prec=1 |
| hasAdminPOS | bit | False | len=1, prec=1 |
| StateSelectionOptionID | uniqueidentifier | False | len=16 |
| AllocationStateSelectionOptionID | uniqueidentifier | False | len=16 |
| isShipCompliantForClubsEnabled | bit | False | len=1, prec=1 |
| isCreditCardSecurityCodeEnabled | bit | False | len=1, prec=1 |
| isClubsEnabled | bit | False | len=1, prec=1 |
| isStoreEnabled | bit | False | len=1, prec=1 |
| isShipCompliantInventoryEnabled | bit | False | len=1, prec=1 |
| isVinoVisitEnabled | bit | False | len=1, prec=1 |
| VinoVisitAppID | uniqueidentifier | True | len=16 |
| WebServiceDatabase | char | False | len=1 |
| isSendLabsEnabled | bit | True | len=1, prec=1 |
| SendLabsUserName | varchar | True | len=50 |
| SendLabsPassword | varchar | True | len=50 |
| RowID | bigint | False | len=8, prec=19 |
| isMemberMaintenanceEnabled | bit | True | len=1, prec=1 |
| hasSalesAssociate | bit | True | len=1, prec=1 |
| hasOMSSite | bit | True | len=1, prec=1 |
| hasOMSSave | bit | True | len=1, prec=1 |
| hasAddressBook | bit | False | len=1, prec=1 |
| hasCustomWineAttributes | bit | False | len=1, prec=1 |
| hasPromoPriceDisplay | bit | False | len=1, prec=1 |
| isEditMemberNumber | bit | False | len=1, prec=1 |
| hasRecipes | bit | False | len=1, prec=1 |
| enableTrueShip | varchar | False | len=10 |
| ValutecClientKeyID | varchar | False | len=40 |
| hasFacebookSite | bit | False | len=1, prec=1 |
| inventorySyncProductNotFound | bit | False | len=1, prec=1 |
| externalBaseDomain | nvarchar | True | len=-1 |
| externalCSSLink | nvarchar | True | len=-1 |
| externalJSLink | nvarchar | True | len=-1 |
| externalStoreFrontLink | nvarchar | True | len=-1 |
| hasCookieCart | bit | False | len=1, prec=1 |
| hasQuickCheckout | bit | False | len=1, prec=1 |
| enableTestCreditCard | bit | False | len=1, prec=1 |
| isShipCompliantLevelOne | bit | True | len=1, prec=1 |
| hasVATracking | bit | False | len=1, prec=1 |
| cookieCartExpiryInDays | int | False | len=4, prec=10 |
| enableSCMarketplace | bit | True | len=1, prec=1 |
| SCMarketplaceKey | varchar | True | len=50 |
| SCMarketplacePassword | varchar | True | len=50 |
| hasAdHoc | bit | False | len=1, prec=1 |
| DateInactive | datetime | True | len=8, prec=23, scale=3 |
| hasClearCarts | bit | False | len=1, prec=1 |
| isAllowFulfillment | bit | False | len=1, prec=1 |
| hCaptchaSiteKey | varchar | True | len=64 |
| allowSubscribeButton | bit | False | len=1, prec=1 |

## VW_Wines
| column | type | nullable | length/precision |
|---|---|---|---|
| rowID | int | False | len=4, prec=10 |
| WineID | uniqueidentifier | False | len=16 |
| WineryID | uniqueidentifier | True | len=16 |
| WineBrandID | uniqueidentifier | True | len=16 |
| WineBottleSizeID | uniqueidentifier | True | len=16 |
| WineName | nvarchar | True | len=510 |
| Picture | nvarchar | True | len=500 |
| WineSKU | nvarchar | True | len=510 |
| VineyardDesignation | nvarchar | True | len=510 |
| Vintage | int | True | len=4, prec=10 |
| WineTypeID | uniqueidentifier | True | len=16 |
| WineVarietalID | uniqueidentifier | True | len=16 |
| WineAppellationID | uniqueidentifier | True | len=16 |
| SalePricePerBottle | money | True | len=8, prec=19, scale=4 |
| PricePerBottle | money | True | len=8, prec=19, scale=4 |
| SalePricePerCase | money | True | len=8, prec=19, scale=4 |
| PricePerCase | money | True | len=8, prec=19, scale=4 |
| MinBottlesPerOrder | int | False | len=4, prec=10 |
| MaxBottlesPerOrder | int | False | len=4, prec=10 |
| BottlesInACase | int | True | len=4, prec=10 |
| isSellAsBottle | bit | True | len=1, prec=1 |
| isSellAsCase | bit | True | len=1, prec=1 |
| isActive | bit | True | len=1, prec=1 |
| isStoreFront | bit | True | len=1, prec=1 |
| isWineStartPage | bit | True | len=1, prec=1 |
| isFeatureWine | bit | True | len=1, prec=1 |
| Teaser | ntext | True | len=16 |
| Description | ntext | True | len=16 |
| TastingNotes | ntext | True | len=16 |
| Ratings | ntext | True | len=16 |
| Awards | ntext | True | len=16 |
| VineyardNotes | ntext | True | len=16 |
| ProductionNotes | ntext | True | len=16 |
| WineMakerNotes | ntext | True | len=16 |
| FoodPairing | ntext | True | len=16 |
| Production | ntext | True | len=16 |
| OtherNotes | ntext | True | len=16 |
| HarvestDate | ntext | True | len=16 |
| Sugar | nvarchar | True | len=510 |
| Acid | nvarchar | True | len=510 |
| PH | nvarchar | True | len=510 |
| Aging | ntext | True | len=16 |
| Fermentation | nvarchar | True | len=510 |
| BottlingDate | nvarchar | True | len=510 |
| ResidualSugar | nvarchar | True | len=510 |
| Tannin | nvarchar | True | len=510 |
| AlcoholPercentage | nvarchar | True | len=510 |
| MetaTagTitle | nvarchar | True | len=510 |
| MetaTagKeywords | ntext | True | len=16 |
| MetaTagDescription | ntext | True | len=16 |
| WSRating | int | True | len=4, prec=10 |
| RPRating | int | True | len=4, prec=10 |
| WERating | int | True | len=4, prec=10 |
| RGSRating | int | True | len=4, prec=10 |
| AverageRating | numeric | True | len=9, prec=18, scale=4 |
| Weight | numeric | True | len=9, prec=18, scale=2 |
| DateAdded | datetime | True | len=8, prec=23, scale=3 |
| DateModified | datetime | True | len=8, prec=23, scale=3 |
| ModifiedBy | uniqueidentifier | True | len=16 |
| WineRegionID | uniqueidentifier | True | len=16 |
| BarrelAgingName | nvarchar | True | len=100 |
| Ageability | nvarchar | True | len=100 |
| WineNotesPDF | nvarchar | True | len=500 |
| NumberOfBottlesTowardMultiple | int | False | len=4, prec=10 |
| CostPerBottle | money | True | len=8, prec=19, scale=4 |
| CostPerCase | money | True | len=8, prec=19, scale=4 |
| isTaxable | bit | True | len=1, prec=1 |
| MarketplaceSKU | varchar | True | len=255 |
| MarketingFee | numeric | True | len=9, prec=18, scale=4 |
| denominationID | int | True | len=4, prec=10 |
| QuantityInPack | tinyint | True | len=1, prec=3 |
| BottleVolume | int | True | len=4, prec=10 |
