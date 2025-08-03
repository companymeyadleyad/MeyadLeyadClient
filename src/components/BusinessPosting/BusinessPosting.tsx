import React, { useState, useEffect, useRef } from 'react';
import './BusinessPosting.css';
import { PropertyService } from 'services/propertyService';
import { PropertyGroupDto } from 'types/Property/PropertyGroupDto';
import bedIcon from '../../assets/icons/home.svg';
import stairsIcon from '../../assets/icons/stairs.svg';
import areaIcon from '../../assets/icons/area.svg';
import html2pdf from 'html2pdf.js';

const A4_WIDTH = 794;
const A4_HEIGHT = 1123;
const ELEMENTS_PER_ROW = 3;
const ELEMENTS_PER_PAGE = 18;
const CELL_HEIGHT = 162.5;
const GAP = 6;

type Property = {
  cityName: string;
  streetName: string;
  numberOfRoomsName: string;
  floor: number;
  propertySizeInMeters: number;
  isThereOptions: boolean;
  isThereParcking: boolean;
  price: number;
  fullName: string;
  phone: string;
  isMediation: boolean;
  imageColumnSpan: number;
  imageUrl: string | null;
};

type CategoryData = {
  categoryId: number;
  categoryName: string;
  elements: Property[];
  imagePositions: number[];
  uploadedImages: { ImgId: number; imageUrl: string; indices: number[] }[];
};

const CardElement = ({ property }: { property: Property }) => {
  return (
    <div className="card-posting">
      {property.isMediation && <div className="tag mediation-color">תיווך</div>}
      {!property.isMediation && <div className="tag without-mediation-color">ללא תיווך</div>}
      <div className="location">
        {property.cityName} - {property.streetName}
      </div>
      <div className="info-layout">
        <div className="info-section right">
          <div>
            <img src={bedIcon} alt="Rooms" className="info-icon" />
            חדרים: {property.numberOfRoomsName}
          </div>
          <div>
            <img src={stairsIcon} alt="Floor" className="info-icon" />
            קומה: {property.floor}
          </div>
          <div>
            <img src={areaIcon} alt="Size" className="info-icon" />
            גודל: {property.propertySizeInMeters} מ"ר
          </div>
        </div>
        <div className="divider"></div>
        <div className="info-section left">
          <div className='characteristics-container'>

            {property.isThereOptions && <span className="characteristics">אופציה </span>}
            {property.isThereParcking && <span className="characteristics">חניה</span>}
          </div>
          <div className="price">₪{property.price ? property.price.toLocaleString() : 'לא צוין מחיר'}</div>
        </div>
      </div>
      <div className={`footer ${property.isMediation ? 'mediation-color' : 'without-mediation-color'}`}>
        {property.fullName} {property.phone}
      </div>
    </div>
  );
};

const BusinessPosting = () => {
  const [categoriesData, setCategoriesData] = useState<CategoryData[]>([]);
  const [selectedGridIndices, setSelectedGridIndices] = useState<{ categoryId: number; indices: number[] }>({ categoryId: 0, indices: [] });
  const pdfRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    const propertyService = new PropertyService();
    const response = await propertyService.getPropertiesList();
    if (response && Array.isArray(response)) {
      const categories: CategoryData[] = response.map(group => ({
        categoryId: group.categoryId,
        categoryName: group.categoryName,
        elements: group.properties,
        imagePositions: [],
        uploadedImages: []
      }));

      setCategoriesData(categories);

      // Load images for each category
      const images = await propertyService.getImages();
      if (images) {
        insertImagesForCategories(images, categories);
      }
    }
  };

  const insertImagesForCategories = (images: any, categories: CategoryData[]) => {
    const updatedCategories = [...categories];

    console.log('Inserting images for categories:', {
      imagesCount: images.length,
      categoriesCount: categories.length,
      images: images.map((img: any) => ({
        imgId: img.imgId,
        indices: img.indices,
        imageDataLength: img.imageData?.length || 0
      }))
    });

    images.forEach((img: any) => {
      // Find which category this image belongs to based on the indices
      const indices = img.indices;
      if (indices.length === 0) return;
      
      // Calculate which category this image belongs to based on the first index
      const firstIndex = indices[0];
      let categoryIndex = 0;
      let currentOffset = 0;
      
      for (let i = 0; i < updatedCategories.length; i++) {
        const category = updatedCategories[i];
        if (firstIndex >= currentOffset && firstIndex < currentOffset + category.elements.length) {
          categoryIndex = i;
          break;
        }
        currentOffset += category.elements.length;
      }
      
      console.log('Processing image:', {
        imgId: img.imgId,
        indices,
        firstIndex,
        categoryIndex,
        currentOffset,
        categoryName: updatedCategories[categoryIndex]?.categoryName
      });
      
      if (categoryIndex < updatedCategories.length) {
        const category = updatedCategories[categoryIndex];
        const indicesToInsert = [...img.indices];
        
        // Convert global indices to local indices for this category
        const localIndices = indicesToInsert.map(globalIndex => globalIndex - currentOffset);
        
        localIndices.sort((a, b) => a - b);

        console.log('Converting indices:', {
          globalIndices: indicesToInsert,
          localIndices,
          categoryName: category.categoryName
        });

        let updatedElements = [...category.elements];
        let updatedImagePositions = [...category.imagePositions];

        localIndices.forEach((index) => {
          if (updatedImagePositions.includes(index)) return;

          updatedElements.push({
            cityName: '',
            streetName: '',
            numberOfRoomsName: '',
            floor: 0,
            propertySizeInMeters: 0,
            isThereOptions: false,
            isThereParcking: false,
            price: 0,
            fullName: '',
            phone: '',
            isMediation: false,
            imageColumnSpan: 1,
            imageUrl: null,
          });

          for (let i = updatedElements.length - 2; i >= index; i--) {
            updatedElements[i + 1] = updatedElements[i];
          }
          updatedElements[index] = null as any;
          updatedImagePositions.push(index);
        });

        category.elements = updatedElements;
        category.imagePositions = updatedImagePositions;
        category.uploadedImages.push({
          ImgId: img.imgId,
          imageUrl: img.imageData,
          indices: localIndices, // Store local indices
        });
        
        console.log('Updated category:', {
          categoryName: category.categoryName,
          elementsLength: category.elements.length,
          imagePositions: category.imagePositions,
          uploadedImagesCount: category.uploadedImages.length
        });
      }
    });

    setCategoriesData(updatedCategories);
  };

  const getAllIndices = (categoryId: number): number[] => {
    const category = categoriesData.find(cat => cat.categoryId === categoryId);
    const indices = category ? category.uploadedImages.flatMap((img) => img.indices) : [];
    console.log('Getting all indices for category:', {
      categoryId,
      categoryName: category?.categoryName,
      indices
    });
    return indices;
  };

  const getInsertIndexSkippingImages = (categoryId: number, clickedIndex: number): number => {
    const allIndices = getAllIndices(categoryId);
    let nextIndex = clickedIndex + 1;
    while (allIndices.includes(nextIndex)) {
      nextIndex++;
    }
    console.log('Getting insert index:', {
      categoryId,
      clickedIndex,
      allIndices,
      nextIndex
    });
    return nextIndex;
  };

  const handleClick = (categoryId: number, index: number) => {
    const category = categoriesData.find(cat => cat.categoryId === categoryId);
    if (!category) return;

    // The index is already local to the category
    const localIndex = index;

    console.log('Clicking on cell:', {
      categoryId,
      categoryName: category.categoryName,
      index,
      localIndex,
      categoryElementsLength: category.elements.length
    });

    const clickedElement = category.elements[localIndex];
    let updatedElements = [...category.elements];
    updatedElements[localIndex] = null as any;

    const indexToInsert = getInsertIndexSkippingImages(categoryId, localIndex);

    updatedElements.push(clickedElement);
    const allIndices = getAllIndices(categoryId);
    let nextIndex = updatedElements.length - 1;
    for (let i = updatedElements.length - 2; i >= indexToInsert; i--) {
      if (updatedElements[i] != null) {
        updatedElements[nextIndex] = updatedElements[i];
        nextIndex = i;
      }
    }
    updatedElements[indexToInsert] = clickedElement;

    // Use local indices for selection
    setSelectedGridIndices({ 
      categoryId, 
      indices: selectedGridIndices.categoryId === categoryId 
        ? [...selectedGridIndices.indices, localIndex]
        : [localIndex]
    });
    
    console.log('Updated selected indices:', {
      categoryId,
      indices: selectedGridIndices.categoryId === categoryId 
        ? [...selectedGridIndices.indices, localIndex]
        : [localIndex]
    });
    
    setCategoriesData(prev => prev.map(cat => 
      cat.categoryId === categoryId 
        ? { ...cat, elements: updatedElements }
        : cat
    ));
  };

  const handleImageUpload = (e: any) => {
    const file = e.target.files?.[0];
    if (file && selectedGridIndices.indices.length > 0) {
      const reader = new FileReader();
      reader.onload = async () => {
        const imageBase64 = reader.result as string;
        const localIndices = [...selectedGridIndices.indices];
        const categoryId = selectedGridIndices.categoryId;
        
        console.log('Starting image upload:', {
          localIndices,
          categoryId,
          selectedGridIndices
        });
        
        // Calculate global indices based on category position
        const categoryIndex = categoriesData.findIndex(cat => cat.categoryId === categoryId);
        let globalOffset = 0;
        
        // Calculate offset from previous categories
        for (let i = 0; i < categoryIndex; i++) {
          globalOffset += categoriesData[i].elements.length;
        }
        
        // Convert local indices to global indices
        const globalIndices = localIndices.map(localIndex => localIndex + globalOffset);
        
        // Calculate page number based on the first global index
        const pageNumber = Math.floor(globalIndices[0] / ELEMENTS_PER_PAGE);

        console.log('Uploading image:', {
          localIndices,
          globalIndices,
          categoryId,
          categoryIndex,
          globalOffset,
          pageNumber,
          imageBase64: imageBase64.substring(0, 50) + '...'
        });

        setCategoriesData(prev => {
          const updated = prev.map(cat => 
            cat.categoryId === categoryId 
              ? {
                  ...cat,
                  uploadedImages: [...cat.uploadedImages, { ImgId: 0, imageUrl: imageBase64, indices: localIndices }],
                  imagePositions: [...cat.imagePositions, ...localIndices]
                }
              : cat
          );
          
          console.log('Updated categories data:', updated.map(cat => ({
            categoryId: cat.categoryId,
            categoryName: cat.categoryName,
            uploadedImages: cat.uploadedImages.length,
            imagePositions: cat.imagePositions
          })));
          
          return updated;
        });

        setSelectedGridIndices({ categoryId: 0, indices: [] });

        const postingId = 1;
        const propertyService = new PropertyService();
        await propertyService.saveImage(
          postingId,
          pageNumber,
          globalIndices,
          imageBase64.split(',')[1]
        );
      };

      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = async (categoryId: number, imgId: number) => {
    const propertyService = new PropertyService();
    const response = await propertyService.deleteImage(imgId);
    if (response) {
      loadProperties();
    }
  };

  // פונקציה לשמירה ל-PDF
  const handleSavePdf = () => {
    if (pdfRef.current) {
      setIsGeneratingPdf(true);
      html2pdf()
        .set({
          margin: [0, 0, 0, 0],
          filename: 'business-posting.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' }
        })
        .from(pdfRef.current)
        .toContainer()
        .toCanvas()
        .toImg()
        .toPdf()
        .save()
        .finally(() => setIsGeneratingPdf(false));
    }
  };

  const cellWidth = Math.floor((A4_WIDTH - 12) / (ELEMENTS_PER_ROW));

  const renderCategoryPages = (category: CategoryData) => {
    const pages = [];
    let currentPage: (Property | null)[] = [];
    let currentPageElementCount = 0;

    category.elements.forEach((element, elementIndex) => {
      // Check if adding the element would exceed the page height
      if (currentPageElementCount === ELEMENTS_PER_PAGE || (currentPageElementCount % ELEMENTS_PER_ROW === 0 && currentPageElementCount + ELEMENTS_PER_ROW > ELEMENTS_PER_PAGE)) {
        pages.push(currentPage);
        currentPage = [];
        currentPageElementCount = 0;
      }

      // If starting a new category and there's space for a new row, add a blank row
      if (elementIndex === 0 && currentPageElementCount % ELEMENTS_PER_ROW !== 0) {
        const remainingSpace = ELEMENTS_PER_ROW - (currentPageElementCount % ELEMENTS_PER_ROW);
        for (let i = 0; i < remainingSpace; i++) {
          currentPage.push(null); // Add blank elements to fill the row
        }
        currentPageElementCount += remainingSpace;
      }

      currentPage.push(element);
      currentPageElementCount++;
    });

    if (currentPage.length > 0) {
      pages.push(currentPage);
    }

    return pages.map((pageElements, pageIndex) => {
      return (
        <div
          key={`${category.categoryId}-${pageIndex}`}
          style={{
            position: 'relative',
            minHeight: `${A4_HEIGHT}px`,
            width: `${A4_WIDTH}px`,
            overflow: 'hidden',
            marginTop: '0px',
          }}
        >
          <div className="custom-header">
            <div className="header-label-bg">
              <span className="header-label">{category.categoryName}</span>
            </div>
            <div className="header-line"></div>
          </div>

          {category.uploadedImages.map((imgObj, imgIndex) => {
            const selectedCells = imgObj.indices
              .filter((localIndex) => {
                const calculatedPageIndex = Math.floor(localIndex / ELEMENTS_PER_PAGE);
                return calculatedPageIndex === pageIndex;
              })
              .map((localIndex) => {
                const indexInPage = localIndex % ELEMENTS_PER_PAGE;
                return {
                  row: Math.floor(indexInPage / ELEMENTS_PER_ROW),
                  col: indexInPage % ELEMENTS_PER_ROW,
                };
              });

            if (selectedCells.length === 0) return null;

            const minRow = Math.min(...selectedCells.map((c) => c.row), Infinity);
            const maxRow = Math.max(...selectedCells.map((c) => c.row), -1);
            const minCol = Math.min(...selectedCells.map((c) => c.col), Infinity);
            const maxCol = Math.max(...selectedCells.map((c) => c.col), -1);

            const imgTop = minRow * CELL_HEIGHT + GAP * minRow;
            const imgLeft = minCol * cellWidth + 3;
            const imgWidth = ((maxCol - minCol + 1) * cellWidth) + (2 * (maxCol - minCol + 1));
            const imgHeight = (maxRow - minRow + 1) * CELL_HEIGHT;

            return (
              <div
                key={imgIndex}
                style={{
                  position: 'absolute',
                  top: `${imgTop}px`,
                  right: `${imgLeft}px`,
                  width: `${imgWidth}px`,
                  height: `${imgHeight}px`,
                  zIndex: 3,
                  marginRight: `${imgObj.indices[0] % 3 === 0 ? '0px' : imgObj.indices[0] % 3 === 1 ? '3px' : '6px'}`,
                  marginTop: '50px',
                  border: '1px solid #ccc',
                  boxSizing: 'border-box',
                }}
              >
                <img
                  src={imgObj.imageUrl}
                  alt=""
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    pointerEvents: 'none',
                  }}
                />
                <button
                  onClick={() => handleDeleteImage(category.categoryId, imgObj.ImgId)}
                  style={{
                    position: 'absolute',
                    top: '4px',
                    right: '4px',
                    backgroundColor: 'red',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    lineHeight: '20px',
                    textAlign: 'center',
                    padding: '0',
                    zIndex: 4,
                    display: isGeneratingPdf ? 'none' : 'block',
                  }}
                  title="Delete image"
                >
                  ×
                </button>
              </div>
            );
          })}

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${ELEMENTS_PER_ROW}, ${cellWidth}px)`,
              gap: `${GAP}px`,
              position: 'relative',
              zIndex: 2,
            }}
          >
            {pageElements.map((el, indexInPage) => {
              const localIndex = pageIndex * ELEMENTS_PER_PAGE + indexInPage;
              const isEmpty = category.imagePositions.includes(localIndex) || 
                             (selectedGridIndices.categoryId === category.categoryId && 
                              selectedGridIndices.indices.includes(localIndex));
              return (
                <div
                  key={localIndex}
                  onClick={() => handleClick(category.categoryId, localIndex)}
                  style={{
                    width: `${cellWidth}px`,
                    height: `${CELL_HEIGHT}px`,
                    overflow: 'hidden',
                    boxSizing: 'border-box',
                    cursor: 'pointer',
                  }}
                >
                  {!isEmpty && el && <CardElement property={el} />}
                </div>
              );
            })}
          </div>

          {/* Footer design at the bottom of the page */}
          <div
            style={{
              position: 'absolute',
              bottom: '0',
              left: '0',
              marginBottom: '3px',
              width: '100%',
              height: 'auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '0 20px',
              boxSizing: 'border-box',
            }}
          >
            <div style={{ width: '100%', borderBottom: '1px solid #1a3b6d', marginBottom: '5px' }}></div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <img src="/images/logo6.png" alt="Logo" style={{ height: '40px' }} />
              <div style={{ color: '#d4a373' }}>גליון 1</div>
              <div className="header-label-bg">
                <span className="header-label">מכירה</span>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div style={{ width: `${A4_WIDTH}px`, margin: '0 auto', position: 'relative', marginTop: selectedGridIndices.indices.length > 0 ? '120px' : '64px' }}>
      {/* כפתור שמירה ל-PDF */}
      <button
        onClick={handleSavePdf}
        className="pdf-save-button"
      >
        📄 שמור הכל ל-PDF
      </button>

      {/* Sticky upload button */}
      <div className={`upload-container ${selectedGridIndices.indices.length === 0 ? 'hidden' : ''}`}>
        <div className="upload-content">
          <p className="upload-label">העלאת תמונה לתאים נבחרים:</p>
          <div className="selected-indices">
            {selectedGridIndices.indices.map((index, i) => (
              <span key={i}>
                {index}{i < selectedGridIndices.indices.length - 1 ? ', ' : ''}
              </span>
            ))}
          </div>
          <div className="upload-input-wrapper">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload}
              className="upload-input"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="upload-button">
              <svg className="upload-icon" viewBox="0 0 24 24">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
              העלאת תמונה
            </label>
          </div>
        </div>
      </div>

      {/* עוטף את כל התוכן ב-ref */}
      <div ref={pdfRef}>
        {categoriesData.map((category) => (
          <div key={category.categoryId}>
            {renderCategoryPages(category)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessPosting; 