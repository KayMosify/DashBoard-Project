import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import styles from "./DeleteModal.module.css";
import DelTriangle from "../assets/DelTriangle.png";

const DeleteModal = ({ isOpen, onClose, onDelete, productDetails }) => {
  return (
    <AlertDialog.Root open={isOpen} onOpenChange={onClose}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className={styles.overlay} />
        <AlertDialog.Content className={styles.modalContent}>
          {/* Modal Header */}
          <div className={styles.header}>
            <div className={styles.title}>
              <img src={DelTriangle} alt="Warning" />
              DELETE CONFIRMATION
            </div>
            <p className={styles.description}>
              Are you sure you want to delete this product?
            </p>
          </div>

          {/* Product Details */}
          <div className={styles.detailsContainer}>
            {productDetails && (
              <>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Product ID:</span>
                  <span className={styles.detailValue}>{productDetails.id}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Brand:</span>
                  <span className={styles.detailValue}>{productDetails.brand}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Product Name:</span>
                  <span className={styles.detailValue}>{productDetails.name}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Category:</span>
                  <span className={styles.detailValue}>{productDetails.category}</span>
                </div>
              </>
            )}
          </div>

          {/* Modal Footer */}
          <div className={styles.footer}>
            <button className={styles.cancelButton} onClick={onClose}>
              Cancel
            </button>
            <button
              className={styles.deleteButton}
              onClick={() => {
                onDelete(); // Call delete function
                onClose(); // Close modal after deletion
              }}
            >
              Delete
            </button>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default DeleteModal;
