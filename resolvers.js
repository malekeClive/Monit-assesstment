const { transfers, recipients } = require("./_db");

module.exports = {
  Query: {
    transfers() {
      return transfers;
    },

    recipients() {
      return recipients;
    },

    detailTransfer(_, args) {
      const transfer = transfers.find(
        (transfer) => Number(transfer.id) === Number(args.id)
      );

      return transfer;
    },

    unassignedRecipients(_, args) {
      const transferId = args.transferId;
      const transfer = transfers.find(
        (transfer) => Number(transfer.id) === Number(transferId)
      );

      const recipientsIds = transfer.recipients.map(
        (recipient) => recipient.id
      );

      return recipients.filter(
        (recipient) => !recipientsIds.includes(recipient.id)
      );
    },

    paginatedRecipient(_, { page, pageSize, search }) {
      let filteredData = recipients;

      if (search) {
        search = search.toLowerCase();

        filteredData = recipients.filter(
          (item) =>
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.description.toLowerCase().includes(search.toLowerCase())
        );
      }

      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;

      const paginatedItems = filteredData.slice(startIndex, endIndex);
      const hasMore = endIndex < recipients.length;

      return {
        page,
        pageSize,
        items: paginatedItems,
        hasMore,
      };
    },

    paginatedTransfer(_, { page, pageSize, search }) {
      let filteredData = transfers;

      if (search) {
        search = search.toLowerCase();

        filteredData = transfers.filter((item) =>
          item.transfer_name.toLowerCase().includes(search.toLowerCase())
        );
      }

      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;

      const paginatedItems = filteredData.slice(startIndex, endIndex);
      const hasMore = endIndex < recipients.length;

      return {
        page,
        pageSize,
        items: paginatedItems,
        hasMore,
      };
    },

    paginatedRecipientsInTransferDetail(
      _,
      { transferId, page, pageSize, search }
    ) {
      const transfer = transfers.find(
        (transfer) => Number(transfer.id) === Number(transferId)
      );
      let filteredData = transfer.recipients;

      if (search) {
        search = search.toLowerCase();

        filteredData = transfer?.recipients.filter(
          (item) =>
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.description.toLowerCase().includes(search.toLowerCase())
        );
      }

      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;

      const paginatedItems = filteredData.slice(startIndex, endIndex);
      const hasMore = endIndex < transfer.recipients.length;

      return {
        page,
        pageSize,
        items: paginatedItems,
        hasMore,
      };
    },
  },
  Mutation: {
    addRecipient(_, args) {
      const { discount, amount } = args.recipient;

      const total = amount - (discount / 100) * amount;

      const newRecipient = {
        id: Math.floor(Math.random() * 10000),
        total: Number(total),
        ...args.recipient,
      };

      recipients.push(newRecipient);
      return newRecipient;
    },

    addTransfer(_, args) {
      const newTransfer = {
        id: Math.floor(Math.random() * 10000),
        recipients: [],
        total: 0,
        totalRecipients: 0,
        ...args.transfer,
      };

      transfers.push(newTransfer);
      return newTransfer;
    },

    assignRecipient(_, args) {
      const { transferId, recipientId } = args.ids;

      const transferIdxToModify = transfers.findIndex(
        (transfer) => transfer.id === transferId
      );

      const recipient = recipients.find(
        (recipient) => recipient.id === recipientId
      );

      transfers[transferIdxToModify].total += recipient.total;
      transfers[transferIdxToModify].recipients.push(recipient);

      return transfers[transferIdxToModify];
    },

    deleteTransfer(_, args) {
      const idToDelete = Number(args.id);
      const indexToDelete = transfers.findIndex(
        (transfer) => Number(transfer.id) === idToDelete
      );

      if (indexToDelete !== -1) {
        transfers.splice(indexToDelete, 1);
      }

      return transfers;
    },

    deleteRecipientInTransfer(_, args) {
      const { transferId, ids } = args;

      const transfer = transfers.find(
        (transfer) => transfer.id === Number(transferId)
      );
      const idsToDelete = ids.map((id) => Number(id));
      const deletedRecipients = [];

      idsToDelete.forEach((idToDelete) => {
        const indexToDelete = transfer.recipients.findIndex(
          (transfer) => Number(transfer.id) === idToDelete
        );

        if (indexToDelete !== -1) {
          deletedRecipients.push(transfer.recipients[indexToDelete]);
          transfer.total -= transfer.recipients[indexToDelete].total;
          transfer.recipients.splice(indexToDelete, 1);
        }
      });

      return transfer;
    },
  },
};
