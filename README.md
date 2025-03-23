# React application optimization

All meassures were taken for **`CountryList`** component.

## Sorting

Recorded interaction: changing sorting from **default** to sorting **by Name from A to Z**.

| Committed at | Render duration |
| ------------ | --------------- |
| **Before optimization** |      |
| 3.4s         | 27.2ms          |
| 3.5s         | 24.8ms          |
| **After optimization** |       |
| 2s           | 3.4ms           |
| 2.1s         | 2.4ms           |

Before optimization:
![Flame chart for sorting before optimization](src/assets/screenshots/image.png)
![Ranked chart for sorting before optimization](src/assets/screenshots/image1.png)

After optimization:
![Flame chart for sorting after optimization](src/assets/screenshots/image2.png)
![Ranked chart for sorting after optimization](src/assets/screenshots/image3.png)

## Filtering

Recorded interaction: changing filtering from **default** to region **Americas**.

| Committed at | Render duration |
| ------------ | --------------- |
| **Before optimization** |      |
| 3.2s         | 26.7ms          |
| 3.3s         | 29.2ms          |
| 3.3s         | 5.8ms           |
| **After optimization** |       |
| 3.4s         | 3.3ms           |
| 3.5s         | 2.8ms           |
| 3.5s         | 0.6ms           |

Before optimization:
![Flame chart for filtering before optimization](src/assets/screenshots/image4.png)
![Ranked chart for filtering before optimization](src/assets/screenshots/image5.png)

After optimization:
![Flame chart for filtering after optimization](src/assets/screenshots/image6.png)
![Ranked chart for filtering after optimization](src/assets/screenshots/image7.png)

## Like/dislike

Recorded interaction: changing liked state for one country **from dislike to like** and **back to dislike**.

| Committed at | Render duration |
| ------------ | --------------- |
| **Before optimization** |      |
| 1s           | 28.5ms          |
| 1.9s         | 25.5ms          |
| **After optimization** |       |
| 1s           | 3.3ms           |
| 1.8s         | 2.8ms           |

Before optimization:
![Flame chart for liking before optimization](src/assets/screenshots/image8.png)
![Ranked chart for liking before optimization](src/assets/screenshots/image9.png)

After optimization:
![Flame chart for liking after optimization](src/assets/screenshots/image10.png)
![Ranked chart for liking after optimization](src/assets/screenshots/image11.png)
