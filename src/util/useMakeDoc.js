import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

export default function useMakeDoc() {

  async function printToFile (titulo, pedidos) {

    const total = pedidos.reduce((sum, pedido) => sum + pedido.total, 0);
    const html = `
      <html>
        <head>
          <meta name="viewport" />
        </head>
        <style>
          table.printer-ticket {
            width: 520px;
            border-collapse: collapse;
            font-family: 'Courier New', Courier, monospace;
            font-size: 14px;
            color: #000;
            background-color: #fff;
            margin: 0 auto;
          }
          table.printer-ticket th,
          table.printer-ticket td {
            padding: 5px;
            border-top: 1px dashed #000;
          }
          table.printer-ticket thead th {
            text-align: center;
            font-size: 18px;
            font-weight: bold;
            padding: 10px 0;
          }
          table.printer-ticket tbody tr {
            border-top: 1px dashed #000;
          }
          table.printer-ticket tbody tr.top td {
            padding-top: 5px;
            padding-bottom: 5px;
          }
          table.printer-ticket td {
            text-align: left;
          }
          table.printer-ticket td[colspan="3"] {
            width: 60%;
          }
          table.printer-ticket td:last-child,
          table.printer-ticket tfoot tr td:last-child {
            text-align: right;
          }
          table.printer-ticket tfoot tr td {
            border-top: 1px dashed #000;
            font-weight: bold;
            padding: 10px 0;
          }
        </style>
        <body>
          <table class="printer-ticket">
            <thead>
            <th class="ttu" colspan="6">
              <b>${titulo}</b>
              <br>
            </th>
          </thead>
          <tbody>
          ${pedidos.map(pedido => `
            <tr class="top">
              <td colspan="3">${pedido.descricao}</td>
              <td>R$ ${(pedido.preco).toFixed(2)} x ${pedido.quantidade}</td>
              <td><strong>R$ ${pedido.total}</strong></td>
            </tr>`).join('')}
          </tbody>
          <tfoot>
            <tr class="sup ttu p--0">
              <td colspan="4"><strong>Total de vendas</strong></td>
              <td align="right"><strong>R$ ${total}</strong></td>
            </tr>
          </tfoot>
        </table>
        </body>
      </html>
    `;

    try {
      // On iOS/android prints the given html. On web prints the HTML from the current page.
      const { uri } = await Print.printToFileAsync({ html });
      // console.log('File has been saved to:', uri);
      await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    } catch (error) {
      console.log(error)
    }

  };

  return {
    printToFile
  }

}