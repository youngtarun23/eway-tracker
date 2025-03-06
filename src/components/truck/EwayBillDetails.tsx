
import { Card, CardContent } from '@/components/ui/card';
import { EwayBillDetails as EwayBillDetailsType } from '@/types';

interface EwayBillDetailsProps {
  details: EwayBillDetailsType;
}

export function EwayBillDetails({ details }: EwayBillDetailsProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-sm mb-2">E-way Bill Details</h4>
            <table className="min-w-full text-xs">
              <tbody>
                <tr>
                  <td className="py-1 text-muted-foreground">EBN Number:</td>
                  <td className="py-1 font-medium">{details.ebnNumber}</td>
                </tr>
                <tr>
                  <td className="py-1 text-muted-foreground">Distance:</td>
                  <td className="py-1 font-medium">{details.distance} km</td>
                </tr>
                <tr>
                  <td className="py-1 text-muted-foreground">Validity:</td>
                  <td className="py-1 font-medium">{details.validityPeriod}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <h4 className="font-medium text-sm mb-2">Document Details</h4>
            <table className="min-w-full text-xs">
              <tbody>
                <tr>
                  <td className="py-1 text-muted-foreground">Type:</td>
                  <td className="py-1 font-medium">{details.document.type}</td>
                </tr>
                <tr>
                  <td className="py-1 text-muted-foreground">Number:</td>
                  <td className="py-1 font-medium">{details.document.number}</td>
                </tr>
                <tr>
                  <td className="py-1 text-muted-foreground">Date:</td>
                  <td className="py-1 font-medium">{details.document.date}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div>
            <h4 className="font-medium text-sm mb-2">Consignor Details</h4>
            <table className="min-w-full text-xs">
              <tbody>
                <tr>
                  <td className="py-1 text-muted-foreground">Name:</td>
                  <td className="py-1 font-medium">{details.consignor.name}</td>
                </tr>
                <tr>
                  <td className="py-1 text-muted-foreground">GSTIN:</td>
                  <td className="py-1 font-medium">{details.consignor.gstin}</td>
                </tr>
                <tr>
                  <td className="py-1 text-muted-foreground">Address:</td>
                  <td className="py-1 font-medium">{details.consignor.address}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div>
            <h4 className="font-medium text-sm mb-2">Consignee Details</h4>
            <table className="min-w-full text-xs">
              <tbody>
                <tr>
                  <td className="py-1 text-muted-foreground">Name:</td>
                  <td className="py-1 font-medium">{details.consignee.name}</td>
                </tr>
                <tr>
                  <td className="py-1 text-muted-foreground">GSTIN:</td>
                  <td className="py-1 font-medium">{details.consignee.gstin}</td>
                </tr>
                <tr>
                  <td className="py-1 text-muted-foreground">Address:</td>
                  <td className="py-1 font-medium">{details.consignee.address}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div>
            <h4 className="font-medium text-sm mb-2">Goods Details</h4>
            <table className="min-w-full text-xs">
              <tbody>
                <tr>
                  <td className="py-1 text-muted-foreground">Description:</td>
                  <td className="py-1 font-medium">{details.goods.description}</td>
                </tr>
                <tr>
                  <td className="py-1 text-muted-foreground">HSN Code:</td>
                  <td className="py-1 font-medium">{details.goods.hsnCode}</td>
                </tr>
                <tr>
                  <td className="py-1 text-muted-foreground">Quantity:</td>
                  <td className="py-1 font-medium">{details.goods.quantity} {details.goods.unit}</td>
                </tr>
                <tr>
                  <td className="py-1 text-muted-foreground">Value:</td>
                  <td className="py-1 font-medium">₹{details.goods.value}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div>
            <h4 className="font-medium text-sm mb-2">Transporter Details</h4>
            <table className="min-w-full text-xs">
              <tbody>
                <tr>
                  <td className="py-1 text-muted-foreground">Name:</td>
                  <td className="py-1 font-medium">{details.transporter.name}</td>
                </tr>
                <tr>
                  <td className="py-1 text-muted-foreground">GSTIN:</td>
                  <td className="py-1 font-medium">{details.transporter.gstin}</td>
                </tr>
                <tr>
                  <td className="py-1 text-muted-foreground">Address:</td>
                  <td className="py-1 font-medium">{details.transporter.address}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
