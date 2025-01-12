/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TagsInput } from "@/components/ui/tags-input";
import ImageUpload from "@/components/globals/image-upload";
import TextEditor from "@/components/globals/text-editor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaRegTrashAlt } from "react-icons/fa";
import { Plus } from "lucide-react";

const formSchema = z.object({
  productName: z
    .string()
    .min(1, { message: "Product name is required" })
    .max(100, { message: "Product name can't be more than 100 characters" }),
  productCategory: z
    .string()
    .min(1, { message: "Product category is required" }),
  brand: z.string().optional(),
  materials: z.array(z.string()).nonempty("Please at least one material"),
  height: z.string().optional(),
  weight: z.string().optional(),
  sku: z.string().optional(),
  warranty: z.string().optional(),
  productImages: z
    .array(
      z.instanceof(File).refine((file) => file.size < 5 * 1024 * 1024, {
        message: "Image size must be less than 5MB",
      })
    )
    .max(7, {
      message: "Maximum 7 files are allowed",
    })
    .nullable(),
  description: z.string().min(1, { message: "Description is required" }),
  variationName: z.string().optional(),
  option: z.string().optional(),
});

const ProductForm = ({ sellerId }: { sellerId: string }) => {
  const [showSpecification, setShowSpecification] = React.useState(false);
  const [showSalesInformation, setShowSalesInformation] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      productCategory: "",
      brand: "",
      materials: [],
      height: "",
      weight: "",
      sku: "",
      warranty: "",
      productImages: [],
      description: "",
      variationName: "",
      option: "",
    },
  });

  React.useEffect(() => {
    const productName = form.watch("productName");
    const productCategory = form.watch("productCategory");
    setShowSpecification(productName.length > 0 && productCategory.length > 0);

    const productImages = form.watch("productImages");
    const description = form.watch("description");
    setShowSalesInformation(
      productImages !== null &&
        productImages.length > 0 &&
        description.length > 0
    );
  }, [
    form.watch("productName"),
    form.watch("productCategory"),
    form.watch("productImages"),
    form.watch("description"),
  ]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div className="grid md:grid-cols-10 grid-cols-1 gap-5">
      <div className="col-span-8">
        <div className="mt-4">
          <Form {...form}>
            <form autoComplete="off" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="bg-white p-3 shadow-md">
                <h1 className="font-semibold">Basic information</h1>
                <div className="space-y-6 mt-4">
                  <FormField
                    control={form.control}
                    name="productName"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel>Product name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Please enter the product name"
                            maxLength={100}
                            {...field}
                          />
                        </FormControl>
                        <span className="absolute top-8 text-sm text-muted-foreground right-3">
                          {form.watch("productName")?.length || 0}/100
                        </span>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="productCategory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Please enter the product name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              {showSpecification && (
                <>
                  <div className="bg-white p-3 mt-4 shadow-md">
                    <h1 className="font-semibold">Specifications</h1>
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-4">
                      <FormField
                        control={form.control}
                        name="brand"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Brand{" "}
                              <span className="text-muted-foreground">
                                (optional)
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Please enter the brand"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="materials"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Material{" "}
                              <span className="text-muted-foreground">
                                (optional)
                              </span>
                            </FormLabel>
                            <FormControl>
                              <TagsInput
                                placeholder="Please enter the materials"
                                value={field.value}
                                onValueChange={field.onChange}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-6">
                      <FormField
                        control={form.control}
                        name="height"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Height{" "}
                              <span className="text-muted-foreground">
                                (optional)
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Please enter the height"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="weight"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Weight{" "}
                              <span className="text-muted-foreground">
                                (optional)
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Please enter the weight"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-6">
                      <FormField
                        control={form.control}
                        name="sku"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              SKU{" "}
                              <span className="text-muted-foreground">
                                (optional)
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Please enter the sku"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="warranty"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Warranty Type{" "}
                              <span className="text-muted-foreground">
                                (optional)
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Please enter the warranty type"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="bg-white p-3 mt-4 shadow-md">
                    <h1 className="font-semibold">Product Details</h1>
                    <div className="mt-4 space-y-6">
                      <FormField
                        control={form.control}
                        name="productImages"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product images</FormLabel>
                            <FormControl>
                              <ImageUpload
                                defaultValues={field.value?.map((file) =>
                                  typeof file === "string"
                                    ? file
                                    : URL.createObjectURL(file)
                                )}
                                onImageUpload={(urls) => field.onChange(urls)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product description</FormLabel>
                            <FormControl>
                              <TextEditor
                                placeholder="Please enter the product description"
                                value={field.value}
                                onChange={field.onChange}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  {showSalesInformation && (
                    <div className="bg-white p-3 mt-4 shadow-md">
                      <h1 className="font-semibold">Sales Information</h1>
                      <div className="mt-4 space-y-6">
                        <FormField
                          control={form.control}
                          name="variationName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Variation Name</FormLabel>
                              <FormControl>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a variation" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Color">Color</SelectItem>
                                    <SelectItem value="Size">Size</SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {form.watch("variationName") && (
                          <div>
                            <FormField
                              control={form.control}
                              name="option"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Option</FormLabel>
                                  <FormControl>
                                    <div className="flex items-center gap-5">
                                      <Input
                                        placeholder="Please enter an option"
                                        {...field}
                                      />
                                      <FaRegTrashAlt className="w-5 h-5 cursor-pointer text-muted-foreground" />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <Button
                              className="mt-2 text-orange-600 hover:text-orange-600 font-semibold"
                              size="sm"
                              variant="ghost"
                              type="button"
                            >
                              <Plus className="w-4 h-4" />
                              Add an option
                            </Button>
                          </div>
                        )}
                      </div>
                      {form.watch("variationName") && (
                        <Button
                          className="mt-2 border-orange-600 text-orange-600 hover:text-orange-600 font-semibold"
                          size="sm"
                          variant="outline"
                          type="button"
                        >
                          <Plus className="w-4 h-4" />
                          Add Variation
                        </Button>
                      )}
                    </div>
                  )}
                </>
              )}
              <div className="mt-3 flex items-center justify-end gap-2">
                <Button variant="outline" type="button">
                  Discard
                </Button>
                <Button variant="outline" type="button">
                  Save as a draft
                </Button>
                <Button
                  type="submit"
                  className="bg-orange-600 hover:bg-orange-600/80"
                >
                  Publish
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
      {form.watch("productName").length > 0 && (
        <div className="col-span-2 mt-4 bg-white border-t-4 border-orange-600 p-3 h-[63vh] overflow-y-auto">
          <h1 className="font-semibold">Requirements</h1>
          <p className="text-sm text-muted-foreground mt-2">
            The product name cannot exceed 100 characters or contain prohibited
            words.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Please select the product category carefully, as it will affect the
            product&apos;s visibility.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Please fill in the product specifications carefully to help buyers.
            You can leave it blank if it is not applicable.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Upload 1 to 7 images in .png, .jpg, .jpeg format with a resolution
            of at least 100*100 px. The file must not be bigger than 5 MB and
            the aspect ratio should be 1:1.
          </p>
          <h1 className="font-semibold mt-5">Tips</h1>
          <div className="mt-2">
            <p className="text-sm text-muted-foreground">
              Clearly describe the product being sold, including brand
              manufacturer, product name, basic attributes (materials,
              functions, features and specifications), (models, colors, sizes).
              Do not include other irrelevant brand names or irrelevant
              information.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductForm;
