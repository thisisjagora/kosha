import { TruckFront } from "@/components/Icons";
import { Button, H, P, Picture } from "@/components/atoms";
import { Checkbox } from "@/components/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/form";
import { Input } from "@/components/input";
import { Column, Row } from "@/components/layout";
import { toast } from "@/components/toast/use-toast";
import { ErrorMessage, StorageKeys } from "@/constants/enums";
import { useQuoteDetailsData } from "@/contexts/QuoteDetails.context";
import { bookMoveFactory } from "@/core/models/bookMoveFactory";
import { useAddToBookings } from "@/hooks/fireStore/useAddToBookings";
import { generateBookingId } from "@/lib/helpers/generateBookingId";
import { generateDoodles } from "@/lib/helpers/generateDoodle";
import { cn, formatCurrency } from "@/lib/utils";
import useUserStore from "@/stores/user.store";
import { BookMove, QuoteDetailsRate, Services } from "@/types/structs";
import { format } from "date-fns";
import { CircleAlert } from "lucide-react";
import { FC, HTMLAttributes, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

const QuoteDetails:FC<HTMLAttributes<HTMLDivElement>> = ({...props}) => <Row {...props} className={cn("flex gap-4", props.className)} />
const QuoteDetailsLocation = () => {

}

interface QuoteDetailsMapProps extends HTMLAttributes<HTMLDivElement> {
      data: {
            location?: {
                  lat: string,
                  long: string
            },
            name: string,
            charge: number,
            reviews: number,
            movesCompleted: string
      }
}
const QuoteDetailsMap:FC<QuoteDetailsMapProps> = ({ data, ...props }) => {
      const { location, name, charge, reviews, movesCompleted} = data;
      return (
            <Column className={cn("shadow-custom bg-white-100 rounded-lg p-4 gap-4", props.className)}>
                  <Picture 
                        container={{
                              className: "w-full h-24 rounded-lg"
                        }}
                        image={{
                              alt: "",
                              src: "/images/map.png",
                              className:"object-cover rounded-lg"
                        }}
                  />
                  <Column className="justify-center items-center gap-4">
                        <H className="text-2xl text-grey-300">{name}</H>
                        <Row className="items-start justify-evenly text-center gap-4 px-8">
                              <Column className="gap-0 flex-1">
                                    <P className="text-primary font-bold font-dm-sans text-lg">{formatCurrency(charge)}</P>
                                    <P className="text-sm font-dm-sans text-grey-300">per hour</P>
                              </Column>
                              <Column className="gap-0 flex-1">
                                    <P className="text-primary font-bold font-dm-sans text-lg">{reviews}</P>
                                    <P className="text-sm font-dm-sans text-grey-300">reviews</P>
                              </Column>
                              <Column className="gap-0 flex-1">
                                    <P className="text-primary font-bold font-dm-sans text-lg">{movesCompleted}</P>
                                    <P className="text-sm font-dm-sans text-grey-300">moves completed</P>
                              </Column>
                        </Row>
                  </Column>
            </Column>
      )
}

interface QuotesDetailsWorkersProps extends HTMLAttributes<HTMLDivElement> {
      movers: number
}
const QuoteDetailsWorkers: FC<QuotesDetailsWorkersProps> = ({ movers, ...props }) => {
      const { updateQuoteField } = useQuoteDetailsData();
      const [count, setCount] = useState<number>(movers);
      const doodles = useMemo(() => generateDoodles({ length: 3 }), []);
    
      useEffect(() => {
        updateQuoteField("movers", count);
      }, [count, updateQuoteField]);
    
      return (
        <Column className={cn("max-w-[400px] text-center items-center justify-center gap-4 bg-white-100 shadow-custom rounded-lg p-4", props.className)}>
          <Row className="justify-between items-center w-full">
            <Button
              onClick={() => setCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 1))}
              className="flex-1 rounded-full shadow-custom max-w-[30px] max-h-[30px] p-0 text-xl font-medium bg-grey-800 text-grey-600 hover:bg-primary hover:text-white-100"
            >
              -
            </Button>
            <Column className="flex-1 max-w-max">
              <Row className="relative min-w-[210px]">
                {doodles.map((item, index) => (
                  <div
                    key={item + index}
                    className={cn("w-[70px] h-[70px] p-[2px] rounded-full bg-white-100 border", {
                      "relative mr-[-20px]": index !== doodles.length - 1,
                    }, `z-${index}`)}
                  >
                    <Picture container={{ className: "w-full h-full rounded-full" }} image={{ alt: "movers doodle", src: item, className: "rounded-full " }} />
                  </div>
                ))}
              </Row>
              <H className="text-primary font-bold text-2xl">{count} Movers</H>
            </Column>
            <Button
              onClick={() => setCount((prevCount) => prevCount + 1)}
              className="flex-1 rounded-full shadow-custom max-w-[30px] max-h-[30px] p-0 text-xl font-medium bg-grey-800 text-grey-600 hover:bg-primary hover:text-white-100"
            >
              +
            </Button>
          </Row>
          <P className="px-12 font-dm-sans text-grey-300 text-base">Click on the -\+ sign to increase or reduce the number of movers</P>
        </Column>
      );
    };
interface QuoteDetailsRatesProps extends HTMLAttributes<HTMLDivElement> {
      rates: Array<QuoteDetailsRate>,
}
const QuoteDetailsRates:FC<QuoteDetailsRatesProps> = ({ rates }) => {
      return (
            <Column className="p-4 bg-white-100 shadow-custom rounded-lg">
                  <H level={2} className="text-primary font-dm-sans text-lg">Rates</H>
                  <Column>
                        {
                              rates.map((item, index) => {
                                    if (!item.rate) return null;

                                    return (
                                          <Row key={item.label + index} className="items-center justify-between p-3 bg-white-100 shadow-custom rounded-lg">
                                                <Row className="items-center">
                                                      <span className="w-[40px] h-[40px] bg-white-300 flex items-center justify-center rounded-lg">{item.icon}</span>
                                                      <P className="text-primary">{item.label} {item.count ? `(${item.count})` : null}</P>
                                                </Row>
                                                <P className="text-primary font-bold">{formatCurrency(item.rate)}</P>
                                          </Row>
                                    )
                              })
                        }
                  </Column>
            </Column>
      )
}

interface QuoteDetailsVehicleProps {
      truckType: string;
}
const QuoteDetailsVehicle: FC<QuoteDetailsVehicleProps> = ({ truckType }) => {
      const { updateQuoteField } = useQuoteDetailsData();
      //TODO: confirm the types of vehicles available
      const truckList = [
        { type: 'pickup truck', image: "/images/truckPickUp.png", quantity: 0 },
        { type: 'van', image: "/images/truckVan.png", quantity: 0 },
        { type: '16 ft', image: "/images/truck16.png", quantity: 0 },
        { type: '24 ft', image: "/images/truck24.png", quantity: 0 }
      ];
    
      const [trucks, setTrucks] = useState(truckList);
      const [selectedTruck, setSelectedTruck] = useState({ type: truckType, quantity: 0 });
    
      const handleIncrease = (index: number) => {
        setTrucks((prevTrucks) =>
          prevTrucks.map((truck, i) =>
            i === index ? { ...truck, quantity: truck.quantity + 1 } : truck
          )
        );
        if (trucks[index].type === selectedTruck.type) {
          setSelectedTruck((prevSelectedTruck) => ({
            ...prevSelectedTruck,
            quantity: prevSelectedTruck.quantity + 1
          }));
        }
      };
    
      const handleDecrease = (index: number) => {
        setTrucks((prevTrucks) =>
          prevTrucks.map((truck, i) =>
            i === index && truck.quantity > 0
              ? { ...truck, quantity: truck.quantity - 1 }
              : truck
          )
        );
        if (trucks[index].type === selectedTruck.type && selectedTruck.quantity > 0) {
          setSelectedTruck((prevSelectedTruck) => ({
            ...prevSelectedTruck,
            quantity: prevSelectedTruck.quantity - 1
          }));
        }
      };
    
      const handleSelectTruck = (type: string) => {
        const selected = trucks.find(truck => truck.type === type);
        if (selected) {
          setSelectedTruck({ type: selected.type, quantity: selected.quantity });
        }
      };
    
      useEffect(() => {
        updateQuoteField("movingTruck", selectedTruck.type);
      }, [selectedTruck.type, updateQuoteField]);
    
      return (
        <Column className="gap-6 w-full p-4 bg-white-100 shadow-custom rounded-lg">
          <H level={2} className="text-primary font-dm-sans text-lg">Choose Truck</H>
          <Column className="gap-4">
            {trucks.map((item, index) => (
              <Row key={index} className="justify-between items-center">
                <Row onClick={() => handleSelectTruck(item.type)} className={`cursor-pointer items-center`}>
                  {selectedTruck.type === item.type ? (
                    <span className="rounded-full border border-primary w-[20px] h-[20px] flex items-center justify-center">
                      <span className="bg-primary w-[10px] h-[10px] rounded-full" />
                    </span>
                  ) : (
                    <span className="border border-primary w-[20px] h-[20px] rounded-full" />
                  )}
                  <Picture container={{ className: "w-[60px] h-[60px] rounded-full ml-4" }} image={{ alt: item.type, src: item.image, className: "rounded-full" }} />
                </Row>
                <Row className="items-center gap-4">
                  <Button size="icon" className="max-w-[20px] max-h-[20px]" onClick={() => handleDecrease(index)}>-</Button>
                  <span>{item.quantity}</span>
                  <Button size="icon" className="max-w-[20px] max-h-[20px]" onClick={() => handleIncrease(index)}>+</Button>
                </Row>
              </Row>
            ))}
          </Column>
        </Column>
      );
};
interface QuoteDetailsChargeProps extends HTMLAttributes<HTMLDivElement> {
      amount: string,
      hourlyRate: string
}
const QuoteDetailsCharge:FC<QuoteDetailsChargeProps> = ({ amount, hourlyRate, ...props}) => {
      const {user} = useUserStore((state) => state);
      const {loading, addToBookings} = useAddToBookings();
      const formData:BookMove = JSON.parse(localStorage.getItem(StorageKeys.FORM_DATA) || "{}");
      const quoteDetailsData = JSON.parse(localStorage.getItem(StorageKeys.QUOTE_DETAIL) || "{}");

      if (!formData || !quoteDetailsData) {
            toast({
                  title: "Oops!",
                  description: ErrorMessage.SERVICE_REQUEST_MADE,
                  variant: "default"
            })
            return;
      }

      const handleBook = () => {
            const formattedFormData = bookMoveFactory(formData);
            const data = {
              bookingId: generateBookingId(),
              clientId: user?.uid ?? "",
              driverId: "", //TODO: where is driverId from?
              ...formattedFormData,
              hasAdditionalStops: formattedFormData.additionalStops.length > 0 ? true : false,
              hasAddOns: formData.services.length > 0 ? true : false,
              status: "Pending" as "Pending",
              movingDate: formattedFormData.date,
              bookingDate: format(new Date(), 'M/dd/yyyy h:mm a'),
              workoutEquipmentsQuantity: formData.workOutEquipment ? parseInt(formData.workOutEquipment) : 0,
              majorAppliancesQuantity: formData.majorAppliances ? parseInt(formData.majorAppliances) : 0,
              pianosQuantity: formData.pianos ? parseInt(formData.pianos ?? "0") : 0,
              hotTubsQuantity: formData.hotTubs ? parseInt(formData.hotTubs ?? "0") : 0,
              poolTablesQuantity: formData.poolTables ? parseInt(formData.poolTables) : 0,
              quote: quoteDetailsData,
              additionalNotes: formData.instructions,
              serviceAddOns: formData.services,
              estimatedNumberOfBoxes: formData.numberOfBoxes ? parseInt(formData.numberOfBoxes) : 0
            };
            const { date, addOns, ...dataWithoutDate } = data;

            addToBookings(dataWithoutDate);
      }
      //TODO: how the voucher code works
      return (
            <Column {...props} className="gap-12 w-full p-6 bg-white-100 shadow-custom rounded-lg">
                  <H level={2} className="text-primary font-dm-sans text-lg">Total minimum charge</H>
                  <H className="text-3xl font-bold">{amount}</H>
                  <Column className="gap-6">
                        <P className="text-grey-600 text-sm">Note: After Minimum Charge Billing Cost {hourlyRate} After Every Additional Hour</P>
                        <Input placeholder="Input Discount Code" className="bg-white-400 border-dashed border-2 border-white-500 placeholder:text-grey-400" />
                        <Button loading={loading} onClick={ () => {if(!(!formData || !quoteDetailsData)) handleBook()}}>Book Now</Button>
                  </Column>
            </Column>
      )
}

interface QuoteDetailsServiceRequirementProps extends HTMLAttributes<HTMLDivElement> {
      services: Array<Services>
}
const QuoteDetailsServiceRequirement:FC<QuoteDetailsServiceRequirementProps> = ({ services, ...props }) => {
      const form = useForm({
            defaultValues: {
                  services: services?.map((service) => service.id) || []
            }
      });
      return (
            <Column {...props} className="gap-12 w-full p-6 bg-white-100 shadow-custom rounded-lg">
                  <H level={2} className="text-primary font-dm-sans text-lg">Services Requirements</H>
                  <Form {...form}>
                        <form>
                              {
                                    services.map((item, index) => (
                                          <FormField
                                                key={item.label + index}
                                                control={form.control}
                                                name="services"
                                                render={({ field }) => {
                                                const checkboxId = `services-${item.id}`;
                                                const isChecked = field.value?.includes(item.id)
                                                return (
                                                      <FormItem className="flex flex-row items-center gap-4 space-y-0 mb-2">
                                                            <FormControl>
                                                                  <Checkbox
                                                                        className="data-[state=checked]:bg-orange-100 data-[state=checked]:border-orange-100"
                                                                        id={checkboxId}
                                                                        checked={isChecked}
                                                                        onCheckedChange={(checked) => {
                                                                        return checked
                                                                        ? field.onChange([...field.value || [], item.id])
                                                                        : field.onChange(field.value?.filter((value) => value !== item.id));
                                                                        }}
                                                                  />
                                                            </FormControl>
                                                            <FormLabel htmlFor={checkboxId} className={cn("font-medium text-grey-100 hover:cursor-pointer", {
                                                                  "text-primary font-medium": isChecked
                                                            })}>
                                                                  {item.label}
                                                            </FormLabel>
                                                      </FormItem>
                                                );
                                                }}
                                          />
                                    ))
                              }
                        </form>
                  </Form>
            </Column>
      )
}

interface QuoteDetailsNotesImagesProps extends HTMLAttributes<HTMLDivElement> {
      images: Array<string>,
      notes: string
}
const QuoteDetailsNotesImages:FC<QuoteDetailsNotesImagesProps> = ({images, notes}) => {
      return (
            <Column className="gap-12 h-full w-full p-6 bg-white-100 shadow-custom rounded-lg">
                  <H level={2} className="text-grey-300 font-dm-sans text-lg">Notes & Images</H>
                  <Row className="flex-wrap gap-4">
                  {
                                          images.map((image, index) => (
                                                <div key={image + index} className="relative flex-1 min-w-[250px] max-w-[300px] h-[180px] group">
                                                      <Picture 
                                                            container={{
                                                                  className: "w-full h-full rounded-lg"
                                                            }}
                                                            image={{
                                                                  alt: "",
                                                                  src: image,
                                                                  className: "object-cover rounded-lg"
                                                            }}
                                                      />
                                                      {/* <Button 
                                                            type="button" 
                                                            variant="ghost" 
                                                            className="bg-transparent hover:bg-transparent p-0 max-w-max absolute -top-4 -right-2 hidden group-hover:inline"
                                                            onClick={() => handleRemoveImage(index)}
                                                      >
                                                            <Cancel className="w-[24px] h-[24px]"/>
                                                      </Button> */}
                                                </div>
                                          ))
                                    }
                  </Row>
                  <P className="text-grey-400"><i>{notes}</i></P>
            </Column>
      )
}
const QuoteDetailsEDT = () => {
      return (
            <Column className="gap-10 w-full p-6 bg-white-100 shadow-custom rounded-lg">
                  <H level={2} className="text-grey-300 font-dm-sans text-lg">Estimated Delivery Time</H>

                  <Column className="gap-8 text-grey-300 font-dm-sans font-normal">
                        <P>Date: 11th May, 2024</P>
                        <H className="text-primary text-2xl">8:00am - 2:00pm</H>
                        <Row className="items-center">
                              <TruckFront className="w-[20px] h-[20px]"/>
                              <P>4.7 Kilometres</P>
                        </Row>
                  </Column>
            </Column>
      )
}
interface QuoteDetailsStatusProps extends HTMLAttributes<HTMLDivElement> {
      status: "Pending" | "Accepted"
}
const QuoteDetailsStatus:FC<QuoteDetailsStatusProps> = ({ status }) => {
      return (
            <Column className="bg-white-100 p-4 shadow-custom rounded-lg">
                  <P className="text-sm text-primary-foreground">Status</P>
                  <P
                        className={cn("font-bold text-lg", {
                              "text-grey-300": status === "Pending",
                              "text-green-200": status === "Accepted"
                        })}
                  >{status}</P>
            </Column>
      )
}

const QuoteDetailsEdit = () => {
      return (
            <Column className="bg-grey-300 p-6 justify-center">
                  <CircleAlert className="w-[24px] h-[24px]"/>
                  <P className="text-white-100">Do you wish to make any changes to your request?</P>
                  <Button className="text-grey-300 bg-white-100">Edit request Details</Button>
            </Column>
      )
}
export {
      QuoteDetails,
      QuoteDetailsLocation,
      QuoteDetailsMap,
      QuoteDetailsWorkers,
      QuoteDetailsRates,
      QuoteDetailsVehicle,
      QuoteDetailsCharge,
      QuoteDetailsServiceRequirement,
      QuoteDetailsNotesImages,
      QuoteDetailsEDT,
      QuoteDetailsStatus,
      QuoteDetailsEdit
}