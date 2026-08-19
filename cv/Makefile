# CV en LaTeX. Requiere tectonic (brew install tectonic): descarga los paquetes
# que necesita, así que no hace falta una instalación completa de TeX Live.
#
#   make          compila las dos versiones y las publica en public/cv/
#   make build    solo compila
#   make check    comprueba que la de 1 página sigue cabiendo en 1 página
#   make clean    borra los PDF generados y los intermedios
#
# Las dos salen del mismo cuerpo (cv-body.tex); los wrappers solo fijan la
# variante. Si editas contenido, edita cv-body.tex.

ONEPAGE  := johan-rodriguez-cv-onepage.pdf
FULL     := johan-rodriguez-cv.pdf
BODY     := cv-body.tex

PUB_ONE  := ../public/cv/Johan-Rodriguez-Security-Engineer.pdf
PUB_FULL := ../public/cv/Johan-Rodriguez-Security-Engineer-detailed.pdf

.PHONY: all build publish check clean

all: publish

build: $(ONEPAGE) $(FULL)

$(ONEPAGE): johan-rodriguez-cv-onepage.tex $(BODY)
	tectonic johan-rodriguez-cv-onepage.tex

$(FULL): johan-rodriguez-cv.tex $(BODY)
	tectonic johan-rodriguez-cv.tex

# La versión corta pierde su razón de ser si se va a dos páginas.
check: $(ONEPAGE)
	@n=$$(pdfinfo $(ONEPAGE) | awk '/^Pages:/ {print $$2}'); \
	if [ "$$n" != "1" ]; then \
	  echo "FALLO: $(ONEPAGE) tiene $$n páginas, debe tener 1. Recorta contenido."; \
	  exit 1; \
	fi; \
	echo "OK: $(ONEPAGE) cabe en 1 página."

publish: build check
	cp $(ONEPAGE) $(PUB_ONE)
	cp $(FULL) $(PUB_FULL)
	@echo "→ $(PUB_ONE)  (versión para postular)"
	@echo "→ $(PUB_FULL)  (versión detallada)"

clean:
	rm -f *.pdf *.aux *.log *.out
