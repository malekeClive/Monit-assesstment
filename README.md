# Monit Assesstment Test

This project is to create a simple Request Transfer.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Tech Stack](#tech-stack)
- [Installation Frontend](#installation-frontend)
- [Installation Backend](#installation-backend)
- [GraphQL Client](#graphql-client)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: You will need Node.js (version v18.12.1 or higher) installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).

## Tech Stack

- Frontend: React (v18), Tailwind, HTML, CSS, JavaScript (ES6+), React-table, react-hook-form, react-infinite-scroll-component
- Backend: Node.js (v18), Express, graphql
- GraphQL Library: Apollo Client (v3)

## Installation Frontend

```shell

$ cd your-repo/client
$ npm install
$ npm start

```

## Installation Backend

```shell

$ cd your-repo
$ npm install
$ npm run dev

```

## GraphQL Client

```graphql
query GetPaginatedRecipient($page: Int!, $pageSize: Int!, $search: String) {
  paginatedRecipient(page: $page, pageSize: $pageSize, search: $search) {
    page
    pageSize
    items {
      id
      name
      description
      discount
      amount
      total
    }
    hasMore
  }
}

query GetPaginatedTransfer($page: Int!, $pageSize: Int!, $search: String) {
  paginatedTransfer(page: $page, pageSize: $pageSize, search: $search) {
    page
    pageSize
    items {
      id
      transfer_name
      recipients {
        id
        name
        description
        discount
        amount
      }
      total
    }
    hasMore
  }
}

query GetPaginatedRecipientsInTransferDetail(
  $transferId: Int!
  $page: Int!
  $pageSize: Int!
  $search: String
) {
  paginatedRecipientsInTransferDetail(
    transferId: $transferId
    page: $page
    pageSize: $pageSize
    search: $search
  ) {
    page
    pageSize
    items {
      id
      name
      description
      discount
      amount
    }
    hasMore
  }
}

query GetTransfers {
  transfers {
    id
    transfer_name
    recipients {
      id
      name
      description
    }
    total
  }
}

query GetDetailTransfer($id: ID!) {
  detailTransfer(id: $id) {
    id
    transfer_name
    totalRecipients
    total
  }
}

query GetRecipients {
  recipients {
    id
    name
    description
    discount
    amount
    total
  }
}

query GetUnassignedRecipients($transferId: ID!) {
  unassignedRecipients(transferId: $transferId) {
    id
    name
    description
    discount
    amount
  }
}

mutation AddRecipient(
  $name: String!
  $description: String!
  $discount: Int!
  $amount: Int!
) {
  addRecipient(
    recipient: {
      name: $name
      description: $description
      discount: $discount
      amount: $amount
    }
  ) {
    name
    description
  }
}

mutation AddTransfer($transfer_name: String!) {
  addTransfer(transfer: { transfer_name: $transfer_name }) {
    id
    transfer_name
    total
  }
}

mutation DeleteTransfer($id: ID!) {
  deleteTransfer(id: $id) {
    transfer_name
  }
}

mutation DeleteRecipientInTransfer($transferId: ID!, $ids: [ID!]) {
  deleteRecipientInTransfer(transferId: $transferId, ids: $ids) {
    transfer_name
    recipients {
      name
    }
  }
}

mutation AssignRecipient($transferId: Int!, $recipientId: Int!) {
  assignRecipient(ids: { transferId: $transferId, recipientId: $recipientId }) {
    transfer_name
    recipients {
      name
      description
    }
    total
  }
}
```
