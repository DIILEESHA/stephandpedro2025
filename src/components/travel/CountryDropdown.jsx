"use client";
import React, { useCallback, useState, forwardRef, useEffect } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ChevronDown, CheckIcon, Globe } from "lucide-react";
import { CircleFlag } from "react-circle-flags";
import { countries } from "country-data-list";

const CountryDropdownComponent = (
  {
    options = countries.all.filter(
      (country) => country.emoji && country.status !== "deleted" && country.ioc !== "PRK"
    ),
    onChange,
    value, // <-- add value prop
    defaultValue,
    disabled = false,
    placeholder = "Select a country",
    slim = false,
    ...props
  },
  ref
) => {
  const [open, setOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(undefined);

  // Keep selectedCountry in sync with value or defaultValue
  useEffect(() => {
    let countryToSelect = undefined;
    if (value) {
      countryToSelect = options.find((c) => c.alpha3 === value);
    } else if (defaultValue) {
      countryToSelect = options.find((c) => c.alpha3 === defaultValue);
    }
    setSelectedCountry(countryToSelect);
  }, [value, defaultValue, options]);

  const handleSelect = useCallback(
    (country) => {
      setSelectedCountry(country);
      onChange?.(country);
      setOpen(false);
      console.log("🌍 CountryDropdown selected:", country);
    },
    [onChange]
  );

  const triggerClasses = cn(slim === true && "w-20");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="ss" ref={ref} disabled={disabled} {...props}>
        {selectedCountry ? (
          <div className="yt">
            <div className="inline-flex items-center justify-center w-5 h-5 shrink-0 overflow-hidden rounded-full">
              <CircleFlag countryCode={selectedCountry.alpha2.toLowerCase()} height={20} />
            </div>
            {slim === false && (
              <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                {selectedCountry.name}
              </span>
            )}
          </div>
        ) : (
          <span>{slim === false ? placeholder : <Globe size={20} />}</span>
        )}
        <ChevronDown size={16} />
      </PopoverTrigger>

      <PopoverContent
        collisionPadding={10}
        side="bottom"
        align="start"
        className="w-[var(--radix-popper-anchor-width)] min-w-[200px] max-w-full bg-white rounded-lg shadow-lg p-0 border border-gray-200"
      >
        <Command className="w-full max-h-[260px] overflow-auto">
          <CommandList>
            <div className="sticky top-0 z-10 bg-white px-4 py-2 border-b border-gray-100">
              <CommandInput placeholder="Search country..." />
            </div>
            <CommandEmpty>
              <p className="px-4 py-6 text-center text-gray-400">No country found.</p>
            </CommandEmpty>
            <CommandGroup className="sha">
              {options
                .filter((x) => x.name)
                .map((option, key) => (
                  <CommandItem className="io" key={key} onSelect={() => handleSelect(option)}>
                    <CircleFlag countryCode={option.alpha2.toLowerCase()} height={22} width={22} className="rounded-full flex-shrink-0" />
                    <span className="oo">{option.name}</span>
                    <CheckIcon
                      className={cn(
                        "ml-auto h-5 w-5 shrink-0 text-blue-500",
                        option.name === selectedCountry?.name ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

CountryDropdownComponent.displayName = "CountryDropdownComponent";
export const CountryDropdown = forwardRef(CountryDropdownComponent);
