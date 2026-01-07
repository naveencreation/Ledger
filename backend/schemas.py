from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from models import TransactionType, PaymentMode

class CreditCreate(BaseModel):
    name_or_purpose: str
    amount: float
    towards: str
    payment_mode: PaymentMode
    reference_no: str

class DebitCreate(BaseModel):
    name_or_purpose: str
    amount: float
    payment_mode: PaymentMode
    reference_no: str

class TransactionResponse(BaseModel):
    id: int
    transaction_type: TransactionType
    name_or_purpose: str
    amount: float
    payment_mode: PaymentMode
    reference_no: str
    created_at: datetime

    class Config:
        from_attributes = True

class BalanceSummary(BaseModel):
    total_credit: float
    total_debit: float
    balance: float
