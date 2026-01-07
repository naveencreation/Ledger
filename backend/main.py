from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from database import engine, get_db
import models, schemas
from models import TransactionType
from typing import List

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS
from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/api/credit", response_model=schemas.TransactionResponse)
def create_credit(credit: schemas.CreditCreate, db: Session = Depends(get_db)):
    try:
        db_txn = models.Transaction(
            transaction_type=TransactionType.CREDIT,
            name_or_purpose=credit.name_or_purpose,
            amount=credit.amount,
            payment_mode=credit.payment_mode,
            reference_no=credit.reference_no
        )
        db.add(db_txn)
        db.commit()
        db.refresh(db_txn)
        return db_txn
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/debit", response_model=schemas.TransactionResponse)
def create_debit(debit: schemas.DebitCreate, db: Session = Depends(get_db)):
    try:
        db_txn = models.Transaction(
            transaction_type=TransactionType.DEBIT,
            name_or_purpose=debit.name_or_purpose,
            amount=debit.amount,
            payment_mode=debit.payment_mode,
            reference_no=debit.reference_no
        )
        db.add(db_txn)
        db.commit()
        db.refresh(db_txn)
        return db_txn
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/api/transactions", response_model=List[schemas.TransactionResponse])
def get_transactions(db: Session = Depends(get_db)):
    return db.query(models.Transaction).order_by(models.Transaction.created_at.desc()).all()

@app.get("/api/balance", response_model=schemas.BalanceSummary)
def get_balance(db: Session = Depends(get_db)):
    total_credit = db.query(func.sum(models.Transaction.amount)).filter(
        models.Transaction.transaction_type == TransactionType.CREDIT
    ).scalar() or 0.0
    
    total_debit = db.query(func.sum(models.Transaction.amount)).filter(
        models.Transaction.transaction_type == TransactionType.DEBIT
    ).scalar() or 0.0
    
    return schemas.BalanceSummary(
        total_credit=total_credit,
        total_debit=total_debit,
        balance=total_credit - total_debit
    )
